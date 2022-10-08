
export default function Home( posts ) {

  return (
    <div>
      <h1>Hello from the homepage</h1>  
      {
        posts.post.nodes.map(post => {
          return (
            <ul key={post.slug}>
              <li>{post.title}</li>
            </ul>
          )
        })
      }
    </div>
    
  );
}

export async function getStaticProps() {

  const rest = await fetch('http://localhost:8888/graphql/', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      query: `
        query HomepageQuery {
          posts {
            nodes {
              id
              slug
              status
              title
            }
          }
        }
      `
    })
  })

  const json = await rest.json();
  
  return {
    props: {
      post: json.data.posts
    }
  }

}
