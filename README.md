#react-native-responsive-stylesheet

Utility which helps to create responsive and dynamic styles for react-native applications.

**Motivation:** While native applications are supposed to handle multiple screen resolutions styling of react native components often needs to be done manually with respect to window dimensions. Furthermore when device orientation changes or in applications running in browser ([react-native-web](https://github.com/necolas/react-native-web)) it is necessary to update styles dynamically. This conditional logic often ends in `render` method what adds to its complexity and readability. This utility should help extract this logic into stylesheet definition itself and provide mechanism to define custom properties based on device layout.

## Installation

```
npm install --save madox2/react-native-responsive-stylesheet
```

## Basic usage

```javascript
import { ResponsiveStyleSheet } from 'react-native-responsive-stylesheet'

const MyComponent = props => {
  const styles = makeStyles()
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello world</Text>
    </View>
  )
}

const makeStyles = ResponsiveStyleSheet.create(({ width, landscape }) => ({
  container: {
    flexDirection: landscape ? 'row' : 'column'
  },
  text: {
    fontSize: width > 300 ? 20 : 12
  },
}))

```

## API

### Exports

* *ResponsiveStyleSheet* - global stylesheet object
* *makeStyleSheet* - factory function to create custom stylesheet object

### ResponsiveStyleSheet

Global stylesheet object.
It is responsible for definition of responsive styles.

*Methods:*

* `create(attributesToStyles: function)`
  - takes function which maps attributes to styles as argument
  - returns factory function which creates styles (factory function can take one argument with additional properties)
* `getProperties()`
  - returns properties (both base and custom properties)
* `setExtension(extension: function)`
  - set extension function which defines custom properties
* `getExtension()`
  - returns extension function

*Example:*

```javascript
import { ResponsiveStyleSheet } from 'react-native-responsive-stylesheet'

// compute and get attributes according to current layout
const attributes = ResponsiveStyleSheet.getAttributes()
console.log(attributes.width) // 400
console.log(attributes.height) // 600
console.log(attributes.landscape) // false
console.log(attributes.orientation) // portrait

// you can define dynamic styles with base properties like `width` or `landspace`
const makeStyles = ResponsiveStyleSheet.create(properties => ({
  container: {
    flexDirection: properties.landscape ? 'row' : 'column'
  },
  text: {
    fontSize: properties.width > 300 ? 20 : 12
  },
}))

// create style object according to current layout
const styles = makeStyles()

```


*Notice:* To make sure responsive styles are correctly applied you would probably need to re-render component when layout changes (e.g. using `onLayout`)

*Notice:* You should define all static styles as usual using react native's `StyleSheet.create()` function since responsive styles are currently represented by plain object literals which could have performance inpact.


### makeStyleSheet()

Factory function to create responsive stylesheet.
It is the same function the `ResponsiveStyleSheet` object is created with.

*Arguments:*

* `extension` - optional extension function


### Base properties

Following properties are available by default when defining responsive styles.

| Name | Type | Description |
|-------------|----------|--------|---|
|`width`      |`Number`  |window width|
|`height`     |`Number`  |window height|
|`landscape`  |`Boolean` |`true` if orientation is landscape|
|`orientation`|`String`  |`landscape` or `portrait`|
|`ratio`      |`Number`  |`width` / `height`|

### Extension

Extension is used to define custom properties.
Those properties should be computed from base properties.
It is a function which takes base properties as an argument and returns additional user defined properties.

*Example:*

```javascript
import { ResponsiveStyleSheet } from 'react-native-responsive-stylesheet'

const extension = properties => {
  const contentWidth = Math.min(properties.width, 300)
  const headerFontSize = properties.landscape ? 14 : 18
  return { contentWidth, headerFontSize }
}

// set extension for global stylesheet
ResponsiveStyleSheet.setExtension(extension)

// use custom properties to define styles
const makeStyles = ResponsiveStyleSheet.create(properties => ({
  container: {
    width: properties.contentWidth,
  },
  header: {
    fontSize: properties.headerFontSize
  },
}))

const styles = makeStyles()

```

*Notice:* You should set extension of global stylesheet object only once when initializing application.

## Future work

* Use `StyleSheet.create()` to create styles instead of plain object literal
* Support media queries

## License

[MIT License](https://github.com/madox2/react-native-responsive-stylesheet/blob/master/LICENSE)
