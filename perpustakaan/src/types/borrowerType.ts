export type Borrower = {
  id: number;
  name: string;
  alamat: string;
  phone: string;
};

export type CreateModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { nama: string; alamat: string; telepon: string }) => void;
};

export type UpdateModalProps = {
  isOpen: boolean;
  borrower: Borrower | null;
  onClose: () => void;
  onSubmit: (data: Borrower) => void;
};
