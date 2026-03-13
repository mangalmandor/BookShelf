import Swal from 'sweetalert2';

const showToast = (title, icon = 'success') => {
    Swal.fire({
        title: title,
        icon: icon,
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        background: '#111827', // Dark background
        color: '#fff',
    });
};

export const showAlert = (title, text, icon = 'success') => {
    return Swal.fire({
        title: title,
        text: text,
        icon: icon,
        background: '#111827',
        color: '#fff',
        confirmButtonColor: '#2563eb', // <B></B>lue color button
        customClass: {
            popup: 'rounded-3xl border border-gray-800' // Tera rounded style
        }
    });
};

