$("#formSignIn").submit(function(e) {
    e.preventDefault();
    // be careful that $(this) doesn't work with arrow function
    const formData = $(this).serialize();
    // alert(formData);

    $.ajax({
        type: "POST",
        url: "/login",
        data: formData,
        success: function (response) {
            alert(response);
            // window.location.replace(response);
        },
        error: function(xhr) {
            alert(xhr.responseText);
        }
    });
});