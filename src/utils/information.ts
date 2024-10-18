// Regular expression for first name validation
// Allows 1-50 characters, only letters (no numbers or special characters)
export const firstNameRegex = /^[A-Za-z]{1,50}$/;

// Regular expression for last name validation
// Allows 1-100 characters, only letters (no numbers or special characters)
export const lastNameRegex = /^[A-Za-z]{1,100}$/;

// Function to test if a string matches the first name criteria
export const isValidFirstName = (name: string): boolean => {
  return firstNameRegex.test(name);
};

// Function to test if a string matches the last name criteria
export const isValidLastName = (name: string): boolean => {
  return lastNameRegex.test(name);
};
