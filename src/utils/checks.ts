export function validateName(name: string): string | null {
  if (!name) {
    return "Name is required";
  }
  const nameRegex = /^[A-Za-z\s']+$/;
  if (!nameRegex.test(name)) {
    return "Name is incorrect";
  }

  return null;
}

export function validateMobileNumber(mobileNumber: string): string | null {
  if (!mobileNumber) {
    return "Mobile number is required";
  }

  const mobileRegex = /^[1-9][0-9]{9}$/;
  if (!mobileRegex.test(mobileNumber)) {
    return "Mobile format is incorrect";
  }

  return null;
}

export function validateEmail(email: string): string | null {
  if (!email) {
    return "Email is required";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Email format is incorrect";
  }

  return null;
}

export function validateGender(gender: string): string | null {
  if (!gender) {
    return "Gender is required";
  }

  return null;
}
export function validateDOB(date: string): string | null {
  if (!date) {
    return "Date of birth is required";
  }

  const dobRegex = /^(\d{4})-(\d{2})-(\d{2})$/;
  if (!dobRegex.test(date)) {
    return "Invalid date format";
  }

  const parsedDate = new Date(date);

  if (isNaN(parsedDate.getTime())) {
    return "Invalid date";
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (parsedDate > today) {
    return "Date must be in the past";
  }

  return null;
}

export function validateTechStack(techStackFields: string[]): string | null {
  if (techStackFields.length === 0) {
    return "At least one field is required for the tech stack";
  }

  for (const field of techStackFields) {
    if (!field.trim()) {
      return "You cannot leave any field empty";
    }
  }

  return null;
}
