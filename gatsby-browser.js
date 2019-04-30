/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
import wrapWithProvider from "./wrap-with-provider"
import SwaggerUI from 'swagger-ui'
import React from 'react'

export const wrapRootElement = wrapWithProvider

window.SwaggerUI = SwaggerUI;
