export const typePolicies = {
  Query: {
    fields: {
      listDocuments: {
        read() {
          return [{ id: '123' }, { id: '321' }];
        }
      },
    }
  }
}
