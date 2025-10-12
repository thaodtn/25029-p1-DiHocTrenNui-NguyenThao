function togglePasswordVisible() {
    const pw = document.getElementById("password");
    if (pw.type === "password") {
        pw.type = "text";
        document.getElementById("show-pw-icon").style.display = "inline-block";
        document.getElementById("hide-pw-icon").style.display = "none";
    } else {
        pw.type = "password";
        document.getElementById("show-pw-icon").style.display = "none";
        document.getElementById("hide-pw-icon").style.display = "inline-block";
    }
}