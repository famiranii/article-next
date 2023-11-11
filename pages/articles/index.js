export async function getServerSideProps(context) {
  return {
    redirect: {
      destination: "/",
    },
  };
}

function Index() {
  return <div>Index</div>;
}

export default Index;
