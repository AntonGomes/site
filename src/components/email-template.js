import * as React from 'react';

export function EmailTemplate(name, email, message) {
  return (
    <div>
      <h1>New message from website</h1>
      <p>Name: {name}</p>
      <p>Email: {email}</p>
      <p>Message: {message}</p>
    </div>
  );
}
