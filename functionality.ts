// Listing element
document.getElementById('resumeForm')?.addEventListener('submit', function (event) {
    event.preventDefault();

    // Type assertion
    const nameElement = document.getElementById('name') as HTMLInputElement;
    const emailElement = document.getElementById('email') as HTMLInputElement;
    const phoneElement = document.getElementById('phone') as HTMLInputElement;
    const educationElement = document.getElementById('education') as HTMLInputElement;
    const workExperienceElement = document.getElementById('workExperience') as HTMLInputElement;
    const skillsElement = document.getElementById('skills') as HTMLInputElement;
    const profilePictureElement = document.getElementById('profilePicture') as HTMLInputElement;

    // Check if all elements exist
    if (nameElement && emailElement && phoneElement && educationElement && workExperienceElement && skillsElement) {
        const name = nameElement.value;
        const email = emailElement.value;
        const phone = phoneElement.value;
        const education = educationElement.value;
        const workExperience = workExperienceElement.value;
        const skills = skillsElement.value;

        // Handle profile picture
        let profilePictureHTML = "";
        if (profilePictureElement?.files && profilePictureElement.files.length > 0) {
            const profilePictureURL = URL.createObjectURL(profilePictureElement.files[0]);
            profilePictureHTML = `<img src="${profilePictureURL}" alt="Profile Picture" width="100" height="100"><br>`;
        }

        // Create resume output
        const resumeOutput = `
            <h2>Resume</h2>
            ${profilePictureHTML}
            <p><strong>Name: </strong> <span id="edit-name" class="editable">${name}</span></p>
            <p><strong>Email: </strong> <span id="edit-email" class="editable">${email}</span></p>
            <p><strong>Phone: </strong> <span id="edit-phone" class="editable">${phone}</span></p>
            <h3>Education</h3>
            <p id="edit-education" class="editable">${education}</p>
            <h3>Work Experience</h3>
            <p id="edit-workExperience" class="editable">${workExperience}</p>
            <h3>Skills</h3>
            <p id="edit-skills" class="editable">${skills}</p>
        `;
        // Display resume
        const resumeOutputElement = document.getElementById('resumeOutput');
        if (resumeOutputElement) {
            resumeOutputElement.innerHTML = resumeOutput;
            makeEditable();
        } else {
            console.error("The resume output element is missing.");
        }
    } else {
        console.error('One or more form elements are missing.');
    }
});

// Function to make resume fields editable
function makeEditable() {
    const editableElements = document.querySelectorAll('.editable');
    editableElements.forEach((element) => {
        element.addEventListener('click', function () {
            const currentElement = element as HTMLElement;
            const currentValue = currentElement.textContent || "";

            // Replace content with an input element for editing
            if (currentElement.tagName === "P" || currentElement.tagName === "SPAN") {
                const input = document.createElement('input');
                input.type = 'text';
                input.value = currentValue;
                input.classList.add('editing-input');

                input.addEventListener('blur', function () {
                    currentElement.textContent = input.value;
                    currentElement.style.display = 'inline';
                    input.remove();
                });

                currentElement.style.display = 'none';
                currentElement.parentNode?.insertBefore(input, currentElement);
                input.focus();
            }
        });
    });
}
