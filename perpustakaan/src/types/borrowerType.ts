export type Borrower = {
  id: number;
  name: string;
  alamat: string;
  phone: string;
};

export type CreateModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; alamat: string; phone: string }) => void;
};

export type UpdateModalProps = {
  isOpen: boolean;
  borrower: Borrower | null;
  onClose: () => void;
  onSubmit: (data: Borrower) => void;
};
