import React, { useState } from "react"

const books = [
  {
    id: 0,
    title: "The Pragmatic Programmer",
    author: "Dave Thomas, Andy Hunt",
    description: `The Pragmatic Programmer is one of those rare tech audiobooks you'll listen, re-listen, and listen to again over the years. Whether you're new to the field or an experienced practitioner, you'll come away with fresh insights each and every time.

Dave Thomas and Andy Hunt wrote the first edition of this influential book in 1999 to help their clients create better software and rediscover the joy of coding. These lessons have helped a generation of programmers examine the very essence of software development, independent of any particular language, framework, or methodology, and the Pragmatic philosophy has spawned hundreds of books, screencasts, and audio books, as well as thousands of careers and success stories.

Now, 20 years later, this new edition re-examines what it means to be a modern programmer. Topics range from personal responsibility and career development to architectural techniques for keeping your code flexible and easy to adapt and reuse.`,
    coverUrl:
      "https://m.media-amazon.com/images/I/510NRcB7AAL._SY445_SX342_.jpg",
    publishYear: 2019,
    genre: "Programming",
    url: "https://amzn.to/4hoAmRD",
  },
  {
    id: 1,
    title: "Clean Code: A Handbook of Agile Software Craftsmanship",
    author: "Robert C. Martin",
    description: `Even bad code can function. But if code isn't clean, it can bring a development organization to its knees. Every year, countless hours and significant resources are lost because of poorly written code. But it doesn't have to be that way.

Noted software expert Robert C. Martin, presents a revolutionary paradigm with Clean Code: A Handbook of Agile Software Craftsmanship. Martin, who has helped bring agile principles from a practitioner's point of view to tens of thousands of programmers, has teamed up with his colleagues from Object Mentor to distill their best agile practice of cleaning code "on the fly" into a book that will instill within you the values of software craftsman, and make you a better programmer―but only if you work at it.

What kind of work will you be doing? You'll be reading code―lots of code. And you will be challenged to think about what's right about that code, and what's wrong with it. More importantly you will be challenged to reassess your professional values and your commitment to your craft.`,
    coverUrl:
      "https://m.media-amazon.com/images/I/41bOkXnNBjL._SY445_SX342_.jpg",
    publishYear: 2008,
    genre: "Programming",
    url: "https://amzn.to/3YP4b6C",
  },
  {
    id: 2,
    title: "Working Effectively with Legacy Code",
    author: "Michael Feathers",
    description: `This book provides programmers with the ability to cost effectively handle common legacy code problems without having to go through the hugely expensive task of rewriting all existing code. It describes a series of practical strategies that developers can employ to bring their existing software applications under control. The author provides useful guidance about how to use these strategies when refactoring or making functional changes to codebases.

One of the book's key points is that it teaches developers to write tests that can be used to make sure they are not unintentionally changing the application as they optimize it. Examples are provided in Java, C++, and C sharp, and the book assumes that the reader has some knowledge of UML notation. Strategies using UML and code in C++ and Java primarily while language independent advice will be delivered in side bars and appendices for language specific users.`,
    coverUrl:
      "https://m.media-amazon.com/images/I/51maZSdupsL._SY445_SX342_.jpg",
    publishYear: 2004,
    genre: "Programming",
    url: "https://amzn.to/3C3qA71",
  },
  {
    id: 3,
    title: "Introduction to Algorithms",
    author:
      "Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein",
    description: `A comprehensive update of the leading algorithms text, with new material on matchings in bipartite graphs, online algorithms, machine learning, and other topics.

Some books on algorithms are rigorous but incomplete; others cover masses of material but lack rigor. Introduction to Algorithms uniquely combines rigor and comprehensiveness. It covers a broad range of algorithms in depth, yet makes their design and analysis accessible to all levels of readers, with self-contained chapters and algorithms in pseudocode. Since the publication of the first edition, Introduction to Algorithms has become the leading algorithms text in universities worldwide as well as the standard reference for professionals. This fourth edition has been updated throughout.

New for the fourth edition:
• New chapters on matchings in bipartite graphs, online algorithms, and machine learning
• New material on topics including solving recurrence equations, hash tables, potential functions, and suffix arrays
• 140 new exercises and 22 new problems
• Reader feedback–informed improvements to old problems
• Clearer, more personal, and gender-neutral writing style
• Color added to improve visual presentation
• Notes, bibliography, and index updated to reflect developments in the field
• Website with new supplementary material`,
    coverUrl: "https://m.media-amazon.com/images/I/61Mw06x2XcL._SY466_.jpg",
    publishYear: 2022,
    genre: "Computer Science",
    url: "https://amzn.to/3YyekD1",
  },
  {
    id: 4,
    title: "Eloquent JavaScript",
    author: "Marijn Haverbeke",
    description: `Completely revised and updated, this best-selling introduction to programming in JavaScript focuses on writing real applications.

JavaScript lies at the heart of almost every modern web application, from social apps like Twitter to browser-based game frameworks like Phaser and Babylon. Though simple for beginners to pick up and play with, JavaScript is a flexible, complex language that you can use to build full-scale applications.

This much anticipated and thoroughly revised third edition of Eloquent JavaScript dives deep into the JavaScript language to show you how to write beautiful, effective code. It has been updated to reflect the current state of JavaScript and web browsers and includes brand-new material on features like class notation, arrow functions, iterators, async functions, template strings, and block scope. A host of new exercises have also been added to test your skills and keep you on track.

As with previous editions, Haverbeke continues to teach through extensive examples and immerses you in code from the start, while exercises and full-chapter projects give you hands-on experience with writing your own programs. You start by learning the basic structure of the JavaScript language as well as control structures, functions, and data structures to help you write basic programs. Then you'll learn about error handling and bug fixing, modularity, and asynchronous programming before moving on to web browsers and how JavaScript is used to program them.

Through projects such as an artificial life simulation, a simple programming language, and a paint program, you'll learn essential programming concepts including syntax, control, data organization, object-oriented and functional programming techniques, DOM manipulation, and server-side development with Node.js.`,
    coverUrl: "https://m.media-amazon.com/images/I/81HqVRRwp3L._SY466_.jpg",
    publishYear: 2018,
    genre: "Programming",
    url: "https://amzn.to/3YvoTXF",
  },
  {
    id: 5,
    title: "The Road to React",
    author: "Robin Wieruch",
    description: `"The Road to React" made its debut in 2016, and since then, I've almost rewritten it annually. This book teaches the core principles of React, guiding you through building a practical application in pure React without complex tooling. The book covers everything from setting up the project to deploying it on a server. Each chapter includes additional recommended reading and exercises. By the end, you'll have the skills to develop your own React applications.

In "The Road to React," I establish a solid foundation before delving into the broader React ecosystem. The book clarifies general concepts, patterns, and best practices for real-world React applications. Ultimately, you'll learn to construct a React application from scratch, incorporating features such as pagination, client-side and server-side searching, and advanced UI interactions like sorting.

Is it up to date?

Programming books are usually outdated soon after their release, but since this book is self- published, I can update it as needed whenever a new version of something related to this book gets released.

I am a beginner. Is this book for me?

Yes. The book starts from zero and takes you through the learning experience step by step. Every chapter builds up on the learnings from the previous chapter. In addition, at the end of every chapter, exercises fortify your lessons learned. If you got stuck in a chapter, you will always find a reference URL to the status quo of the actual code.`,
    coverUrl: "https://m.media-amazon.com/images/I/51j1nrM7ETL._SY466_.jpg",
    publishYear: 2024,
    genre: "Programming",
    url: "https://amzn.to/4f7B6st",
  },
]

const Books = () => {
  const [selectedBook, setSelectedBook] = useState(books[0])

  return (
    <div className="w-full mt-8">
      <div className="py-6 border-b border-gray-200 dark:border-gray-800">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-left">
          Top 6 Most Recommended Developer Books
        </h2>
      </div>
      <div className="py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="h-[600px] overflow-hidden border border-gray-200 dark:border-gray-800 rounded-lg">
            <div className="p-6">
              <div className="h-[568px] overflow-y-auto pr-4 scrollbar">
                <h3 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">
                  {selectedBook.title}
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                  by {selectedBook.author}
                </p>
                {selectedBook.url && (
                  <a
                    href={selectedBook.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-4 py-2 mb-4 bg-black dark:bg-white text-white dark:text-black rounded-lg transition-colors duration-200"
                  >
                    Check out this book on Amazon
                  </a>
                )}

                <div className="space-y-4">
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                    {selectedBook.description}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>Published:</strong> {selectedBook.publishYear}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>Genre:</strong> {selectedBook.genre}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {books.map(book => (
              <div
                key={book.id}
                className={`cursor-pointer border rounded-lg transition-all duration-300 hover:border-indigo-500 ${
                  selectedBook.id === book.id
                    ? "border-indigo-500"
                    : "border-gray-200 dark:border-gray-800"
                }`}
                onClick={() => setSelectedBook(book)}
              >
                <div className="p-4 flex flex-col items-center">
                  <div className="w-full h-32 mb-4 overflow-hidden rounded-md">
                    <img
                      src={book.coverUrl}
                      alt={`Cover of ${book.title}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-full text-left">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-0">
                      {book.title}
                    </h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Books
