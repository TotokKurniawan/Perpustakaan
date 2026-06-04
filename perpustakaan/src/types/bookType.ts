export type Book = {
  id: number;
  title: string;
  author: string;
  publisher: string;
  year: number;
};
export type CreateModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    title: string;
    author: string;
    publisher: string;
    year: number;
  }) => void;
};
export type UpdateModalProps = {
  isOpen: boolean;
  book: Book | null;
  onClose: () => void;
  onSubmit: (data: Book) => void;
};
