$("#formSignIn").submit(function(e) {
    e.preventDefault();
    // be careful that $(this) doesn't work with arrow function
    const formData = $(this).serialize();
    // alert(formData);
    // reset form
    $(this).trigger("reset");
    // hide modal
    $("#modalSignIn").modal("hide");

    $.ajax({
        type: "POST",
        url: "/login",
        data: formData,
        success: function (response) {
            // alert(response.token);
            // keep token to localstorage
            window.localStorage.token = response.token;
            window.location.replace(response.url);
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