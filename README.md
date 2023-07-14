# Sea Cinema

Sea Cinema is a web application designed to enhance the movie going experience by allowing customers to easily book movie tickets online. With Sea Cinema, users no longer have to wait in long queues to purchase tickets. This README provides an overview of the project, installation instructions, usage guidelines, and credits.

Developed using NextJS as a full-stack web application due to the small amount of time. Nextjs is very good at acting as a frontend because it supports server-side rendering to improve SEO. Besides being a frontend application, NextJS can also develop an API as a BE application.

## Tech Stack

- [Next.js](https://nextjs.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Next Auth](https://next-auth.js.org/)
- [Prisma](https://www.prisma.io/)
- [Shadcn UI](https://ui.shadcn.com/)
- [Planet Scale](https://planetscale.com/)

## Installation

To run Sea Cinema locally, follow these steps:

1. Clone the repository:

   \`git clone https://github.com/Chandratand/sea-cinema.git\`

2. Navigate to the project directory:

   \`cd sea-cinema\`

3. Install the dependencies:

   \`npm install\`

4. Create a .env file in the root directory and provide the required environment variables:

   \`\`\`
   DATABASE_URL=your_database_url
   NEXTAUTH_URL=http://localhost:3000
   \`\`\`

   Note: Replace \`your_database_url\` with the URL of your MySQL database.

5. Start the development server:

   \`npm run dev\`

6. Open your browser and visit \`http://localhost:3000\` to access Sea Cinema.

## Usage

Sea Cinema provides a user-friendly interface for booking movie tickets. Follow the steps below to use the application:

1. Navigate to the homepage of Sea Cinema.

2. Browse the available movies and select the desired movie.

3. Choose the preferred showtime and number of tickets. (you will need authentication first)

4. Click Buy ticket button to buy tickets.

5. Top up balance if the balance is not enough

6. Will navigate to transaction page after buy ticket success and you can cancel ticket.
