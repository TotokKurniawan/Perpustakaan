import Swal from "sweetalert2";

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
