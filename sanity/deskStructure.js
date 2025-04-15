// /sanity/deskStructure.js
export const myStructure = (S) =>
    S.list()
      .title('Content')
      .items(
        S.documentTypeListItems().filter(
          (listItem) => listItem.getId() !== 'bursaryDocument'
        )
      );
  