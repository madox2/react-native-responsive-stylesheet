import { Dimensions } from 'react-native';

/**
 * Factory function to create ResponsiveStyleSheet object.
 */
const make = extension => {
  let _extension = extension || (() => ({}));

  const setExtension = e => {
    _extension = e;
  };

  const getExtension = () => {
    return _extension;
  };

  /**
   * Re-compute base and custom propeties.
   */
  const _calculateProperties = () => {
    const { width, height } = Dimensions.get('window');
    const landscape = width > height;
    const ratio = width / height;
    const orientation = landscape ? 'landscape' : 'portrait';
    const baseProperties = { width, height, landscape, orientation, ratio };
    const customProperties = _extension(baseProperties);
    return Object.assign({}, baseProperties, customProperties);
  };

  /**
   * Compute and return properties.
   */
  const getProperties = () => {
    return _calculateProperties();
  };

  /**
   * Factory function to create responsive styles.
   * Maps properties to styles.
   */
  const create = attributesToStyles => () => {
    const properties = _calculateProperties();
    return attributesToStyles(properties);
  };

  return { create, getProperties, setExtension, getExtension };
};

export const makeSheet = make;