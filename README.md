#### Introduction

https://synthblog.vercel.app/

This is project created using Next 13, Typescript and Ant Design as its UI. Login and access home page to show Post using Go Rest Token. 
home page able to show posts and able to filter using search title and pagination. To create new post, click on Create Post button on homepage then fill the form.
To edit or delete post, click on one of the post, and go to details. The button to edit and delete on right corner of the post.

## File Structure

    src
    ├── component               # components used in pages
    │   ├── benchmarks          # page layouts
    ├── models                  # typescript models 
    ├── pages                   # next pages routes
    ├── store                   # state management
    ├── style                   # class css tailwind style
    ├── utils                   # reusable functions
    └── ...


## Dependencies

- Ant Design
- Tailwind
- Husky
- Eslint
- Prettier
- Tanstack Query             
- Axios
- pnpm
- node 18
- Cypress

## Development

To run development SynthBlog, follow these steps:
1. Open the project in your favorite code editor.
2. Modify the source code to fit your needs.
3. Start the project using node 18: **`pnpm run dev`**
