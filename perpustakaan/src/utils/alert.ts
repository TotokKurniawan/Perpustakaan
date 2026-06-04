import Swal from "sweetalert2";

export const confirmDelete = async (
  title = "Hapus Data?",
  text = "Data yang sudah dihapus tidak dapat dikembalikan.",
) => {
  const result = await Swal.fire({
    title,
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Ya, Hapus",
    cancelButtonText: "Batal",
    confirmButtonColor: "#dc2626",
  });

  return result.isConfirmed;
};
export const successAlert = (message: string) => {
  Swal.fire({
    icon: "success",
    title: "Berhasil",
    text: message,
    timer: 2000,
    showConfirmButton: false,
  });
};

export const errorAlert = (message: string) => {
  Swal.fire({
    icon: "error",
    title: "Gagal",
    text: message,
  });
};
