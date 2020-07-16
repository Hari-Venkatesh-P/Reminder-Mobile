import * as React from 'react';

export const navigationRef = React.createRef();

export function navigate(name, params) {
  console.log("In function navigate of rootnavigation.js")
  navigationRef.current?.navigate(name, params);
}