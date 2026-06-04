import { Book } from "./bookType";
import { Borrower } from "./borrowerType";

export type Loan = {
  id: number;
  book_id: number;
  borrower_id: number;
  borrow_date: string;
  return_date: string;
  status: string;

  Book?: Book;
  Borrower?: Borrower;
};

export type CreateLoanModalProps = {
  isOpen: boolean;
  onClose: () => void;
  borrowers: {
    id: number;
    name: string;
  }[];
  books: {
    id: number;
    title: string;
  }[];
  onSubmit: (data: {
    borrower_id: number;
    book_id: number;
    borrow_date: string;
    return_date: string;
    status: string;
  }) => void;
};

export type UpdateLoanModalProps = {
  isOpen: boolean;
  onClose: () => void;
  loan: any;

  borrowers: {
    id: number;
    name: string;
  }[];

  books: {
    id: number;
    title: string;
  }[];

  onSubmit: (
    id: number,
    data: {
      borrower_id: number;
      book_id: number;
      borrow_date: string;
      return_date: string;
      status: string;
    },
  ) => void;
};
