export interface Book {
   ISBN: string;
   title: string;
}

export const createBook = async (
   KV: KVNamespace,
   param: Book
): Promise<Book | undefined> => {
   if (!(param && param.title && param.ISBN)) return undefined;

   const newBook: Book = { ISBN: param.ISBN, title: param.title };
   await KV.put(param.ISBN, JSON.stringify(newBook));
   return newBook;
};

export const getBook = async (
   KV: KVNamespace,
   ISBN: string
): Promise<Book | undefined> => {
   const value = await KV.get(ISBN);
   if (!value) return undefined;
   const book: Book = JSON.parse(value);
   return book;
};
