function HideMenuJavaScript() {
    if ($(".navbar-toggler").is(":visible") == true) {
        $('.navbar-toggler').click();
    }
}

function nameIsValid() {
    return (document.getElementById('name').value);
}

function descriptionIsValid() {
    return (document.getElementById('description').value);
}

function lengthNameIsValid() {
    var nameHero = document.getElementById("name").value;

    return (nameHero.length <= 100);
}

function lengthDescriptionIsValid() {
    var descriptionHero = document.getElementById("description").value;

    return (descriptionHero.length <= 255);
}

function validateFieldsJavaScript() {
    var nameHeroIsValid = nameIsValid();
    var descriptionHeroIsValid = descriptionIsValid();
    var lengthNameHeroIsValid = lengthNameIsValid();
    var lengthDescriptionHeroIsValid = lengthDescriptionIsValid();

    if (!nameHeroIsValid) {
        alert('Invalid name Hero. This field is required.');
        document.getElementById('name').focus();
        return false;
    }
    else if (!descriptionHeroIsValid) {
        alert('Invalid description Hero. This field is required.');
        document.getElementById('description').focus();
        return false;
    }
    else if (!lengthNameHeroIsValid) {
        alert('Number of characters in the hero name is greater than the maximum allowed (100).');
        document.getElementById('name').focus();
        return false;
    }
    else if (!lengthDescriptionHeroIsValid) {
        alert('Number of characters in the hero description is greater than the maximum allowed (255).');
        document.getElementById('description').focus();
        return false;
    }

    return true;
}

function moveScrollTop() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
}