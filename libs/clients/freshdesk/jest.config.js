module.exports = {
  displayName: 'clients-freshdesk',
  preset: '../../../jest.preset.js',
  verbose: true,
  silent: false,
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  transform: {
    '^.+\\.[tj]sx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../coverage/libs/clients/freshdesk',
}
