import ReactGiphySearchbox from 'react-giphy-searchbox';

function GifSearch(props: any) {
  const { setClubImage } = props;
  return (
    <ReactGiphySearchbox
      apiKey="9Ixlv3DWC1biJRI57RanyL7RTbfzz0o7"
      onSelect={(item: any) => setClubImage(item.embed_url)}
      masonryConfig={[
        { columns: 2, imageWidth: 110, gutter: 5 },
        {
          mq: '700px', columns: 3, imageWidth: 120, gutter: 5,
        },
      ]}
    />
  );
}

export default GifSearch;
