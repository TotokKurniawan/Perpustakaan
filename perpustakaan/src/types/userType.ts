export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
};

export type CreateModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; email: string; password: string }) => void;
};

export type UpdateModalProps = {
  isOpen: boolean;
  user: User | null;
  onClose: () => void;
  onSubmit: (data: User) => void;
};
