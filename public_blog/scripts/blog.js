$(document).ready(function() {
    $(".btn-danger").click(function() {
        // alert('delete');
        $.ajax({
            type: "DELETE",
            url: "/post",
            headers: {'authorization': 'Bearer ' + window.localStorage.token},
            success: function (response) {
                alert(response);
                // keep token to localstorage
                // window.localStorage.token = response.token;
                // window.location.replace(response.url);
            },
            error: function(xhr) {
                Swal.fire({
                    icon: 'error',
                    title: xhr.responseText,
                });
                // alert(xhr.responseText);
            }
        });
    });
})