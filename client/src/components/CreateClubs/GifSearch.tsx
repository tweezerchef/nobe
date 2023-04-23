import ReactGiphySearchbox from "react-giphy-searchbox";

const GifSearch = () => {
  return (
    <ReactGiphySearchbox
      apiKey="9Ixlv3DWC1biJRI57RanyL7RTbfzz0o7"
      onSelect={(item: any) => console.log(item)}
      masonryConfig={[
        { columns: 2, imageWidth: 110, gutter: 5 },
        { mq: "700px", columns: 3, imageWidth: 120, gutter: 5 }
      ]}
    />
  )
}

export default GifSearch;