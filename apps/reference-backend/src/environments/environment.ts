export default {
  production: process.env.NODE_ENV === 'production',
  audit: {
    defaultNamespace: '@island.is/reference-backend',
    groupName: process.env.AUDIT_GROUP_NAME,
    // Same service name as in Nx workspace.json
    serviceName: 'reference-backend',
  },
  auth: {
    issuer:
      process.env.IDENTITY_SERVER_ISSUER_URL ??
      'https://identity-server.dev01.devland.is',
    audience: '@island.is',
  },
}
