import React,
{
  FC,
  useState,
  ChangeEvent,
  ReactElement,
  useEffect,
  KeyboardEvent,
  useRef
} from "react";
import classNames from "classnames";
import Input, { InputProps } from "../Input/input";
import Icon from "../Icon/icon";
import useDebounce from "../../hook/useDebounce";
import useClickOutside from "../../hook/useClickOutside";

interface DataSourceObject {
  value: string
}
// 兼容非string情况
export type DataSourceType<T = {}> = T & DataSourceObject

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'>{
  fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>,
  onSelect?: (item: DataSourceType) => void,
  renderOption?: (item: DataSourceType) => ReactElement,
}

export const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const {
    fetchSuggestions,
    onSelect,
    value,
    renderOption,
    ...restProps
  } = props

  const [ inputValue, setInputValue ] = useState(value as string)
  const [ suggestion, setSuggestions ] = useState<DataSourceObject[]>([])
  const [ loading, setLoading ] = useState(false)
  const [ highlightIndex, setHighlightIndex ] = useState(-1)
  const triggerSearch = useRef(false)
  const componentRef = useRef<HTMLDivElement>(null)
  const debouncedValue = useDebounce(inputValue, 300)
  useClickOutside(componentRef, () => { setSuggestions([])})

  useEffect(() => {
    if (debouncedValue && triggerSearch.current) {
      const results = fetchSuggestions(inputValue)
      if (results instanceof Promise) {
        setLoading(true)
        // 处理异步结果
        results.then(data => {
          setLoading(false)
          setSuggestions(data)
        })
      } else {
        setSuggestions(results)
      }
    } else {
      setSuggestions([])
    }
    setHighlightIndex(-1)
  }, [debouncedValue])

  const highlight = (index: number) => {
    if (index < 0) index = 0
    if (index >= suggestion.length) index = suggestion.length - 1
    setHighlightIndex(index)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    switch (e.keyCode) {
      case 13: // enter
        if (suggestion[highlightIndex]) {
          handleSelect(suggestion[highlightIndex])
        }
        break
      case 38: // 上箭头
        highlight(highlightIndex - 1)
        break
      case 40: // 下箭头
        highlight(highlightIndex + 1)
        break
      case 27: //ESC
        setSuggestions([])
        break
      default:
        break
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setInputValue(value)
    triggerSearch.current = true
  }

  const handleSelect = (item: DataSourceObject) => {
    setInputValue(item.value)
    setSuggestions([])
    if (onSelect) {
      onSelect(item)
    }
    triggerSearch.current = false
  }

  const generateDropdown = () => {

    const renderTemplate = (item: DataSourceObject) => {
      return renderOption ? renderOption(item) : item.value
    }
    return (
      <ul className={'akita-suggestion-list'}>
        { loading &&
        <div className="suggstions-loading-icon">
          <Icon icon="spinner" spin/>
        </div>
        }
        {
          suggestion.map((item, index) => {
            const classes = classNames('suggestion-item', {
              'is-active': index === highlightIndex
            })
            return (
              <li className={classes} key={`${Date.now()}-${index}`} onClick={() => handleSelect(item)}>
                {renderTemplate(item)}
              </li>
            )
          })
        }
      </ul>
    )
  }

  return (
    <div className="akita-auto-complete" ref={componentRef}>
      <Input
        value={inputValue}
        onChange={e => handleChange(e)}
        onKeyDown={e => handleKeyDown(e)}
        {...restProps}
      />
      { suggestion.length > 0 ? generateDropdown() : ''}
    </div>
  )
}
