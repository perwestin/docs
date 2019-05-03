// Replacing '/' would result in empty string which is invalid
const replacePath = path => (path === `/` ? path : path.replace(/\/$/, ``))

const configurationOfType = (allJson, typeName) => {
    return allJson.edges
        .map(edge => edge.node)
        .filter(node => node.type === typeName)
}
  
module.exports = { replacePath, configurationOfType }
