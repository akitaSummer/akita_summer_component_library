import React from 'react'
import { storiesOf } from "@storybook/react";

storiesOf('Welcome Page', module)
  .add('welcome', () => {
    return (
      <>
        <h1>欢迎来到akitaSummer的组件库</h1>
        <p>这是个人练习时自己从零开始创作的组件库，用于巩固实习期间学习的react和typescript知识，以及加强自己组件的封装能力</p>
        <h3>安装试试</h3>
        <code>
          npm install akita_summer_component_library --save
        </code>
        <p style={{ margin: 0 }}>or</p>
        <code>
          yarn add akita_summer_component_library
        </code>
      </>
    )
  }, { info: { disable: true}})
