import React from "react";
import "./index.scss";

const photos = [
  "https://s3-alpha-sig.figma.com/img/d5a9/a739/218a5e55722f281273945789dba171b3?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=kE0o7C1e0i8r5e5c2b0a1a0~k9L8M7N6O5P4Q3R2S1T0U~V9W8X7Y6Z5A4B3C2D1E0F~G9H8I7J6K5L4M3N2O1P0Q~R9S8T7U6V5W4X3Y2Z1~a-b-c-d-e-f-g-h-i-j-k-l-m-n-o-p-q-r-s-t-u-v-w-x-y-z",
  "https://s3-alpha-sig.figma.com/img/d854/a65d/55a29c9be4dfd0b8332158b87965215c?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=J13rY~uG-2s2U7I6Y09xQ8V~vC06g9i~TjU7d7o-9e9A-3o6Q6B8j8q9~t8w5k6J2X9~G6a5f4c3b2a1~C4D6F8G9H1I2J3K4L5M6N7O8P9Q0R1S2T3U4V5W6X7Y8Z9~",
  "https://images.unsplash.com/photo-1581093450021-1b6c9ba3f4f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  "https://images.unsplash.com/photo-1627843444991-7848b594b1a8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  "https://s3-alpha-sig.figma.com/img/d5a9/a739/218a5e55722f281273945789dba171b3?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=kE0o7C1e0i8r5e5c2b0a1a0~k9L8M7N6O5P4Q3R2S1T0U~V9W8X7Y6Z5A4B3C2D1E0F~G9H8I7J6K5L4M3N2O1P0Q~R9S8T7U6V5W4X3Y2Z1~a-b-c-d-e-f-g-h-i-j-k-l-m-n-o-p-q-r-s-t-u-v-w-x-y-z",
  "https://s3-alpha-sig.figma.com/img/d854/a65d/55a29c9be4dfd0b8332158b87965215c?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=J13rY~uG-2s2U7I6Y09xQ8V~vC06g9i~TjU7d7o-9e9A-3o6Q6B8j8q9~t8w5k6J2X9~G6a5f4c3b2a1~C4D6F8G9H1I2J3K4L5M6N7O8P9Q0R1S2T3U4V5W6X7Y8Z9~",
  "https://images.unsplash.com/photo-1581093450021-1b6c9ba3f4f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  "https://images.unsplash.com/photo-1627843444991-7848b594b1a8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  "https://s3-alpha-sig.figma.com/img/d5a9/a739/218a5e55722f281273945789dba171b3?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=kE0o7C1e0i8r5e5c2b0a1a0~k9L8M7N6O5P4Q3R2S1T0U~V9W8X7Y6Z5A4B3C2D1E0F~G9H8I7J6K5L4M3N2O1P0Q~R9S8T7U6V5W4X3Y2Z1~a-b-c-d-e-f-g-h-i-j-k-l-m-n-o-p-q-r-s-t-u-v-w-x-y-z",
  "https://s3-alpha-sig.figma.com/img/d854/a65d/55a29c9be4dfd0b8332158b87965215c?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=J13rY~uG-2s2U7I6Y09xQ8V~vC06g9i~TjU7d7o-9e9A-3o6Q6B8j8q9~t8w5k6J2X9~G6a5f4c3b2a1~C4D6F8G9H1I2J3K4L5M6N7O8P9Q0R1S2T3U4V5W6X7Y8Z9~",
  "https://images.unsplash.com/photo-1581093450021-1b6c9ba3f4f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  "https://images.unsplash.com/photo-1627843444991-7848b594b1a8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  "https://s3-alpha-sig.figma.com/img/d5a9/a739/218a5e55722f281273945789dba171b3?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=kE0o7C1e0i8r5e5c2b0a1a0~k9L8M7N6O5P4Q3R2S1T0U~V9W8X7Y6Z5A4B3C2D1E0F~G9H8I7J6K5L4M3N2O1P0Q~R9S8T7U6V5W4X3Y2Z1~a-b-c-d-e-f-g-h-i-j-k-l-m-n-o-p-q-r-s-t-u-v-w-x-y-z",
  "https://s3-alpha-sig.figma.com/img/d854/a65d/55a29c9be4dfd0b8332158b87965215c?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=J13rY~uG-2s2U7I6Y09xQ8V~vC06g9i~TjU7d7o-9e9A-3o6Q6B8j8q9~t8w5k6J2X9~G6a5f4c3b2a1~C4D6F8G9H1I2J3K4L5M6N7O8P9Q0R1S2T3U4V5W6X7Y8Z9~",
  "https://images.unsplash.com/photo-1581093450021-1b6c9ba3f4f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  "https://images.unsplash.com/photo-1627843444991-7848b594b1a8?ixlib=rb-4.0.3&id=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
];

const PhotoGrid = () => {
  return (
    <div className="photo-grid-container">
      <h2 className="photo-grid-title">Ảnh</h2>
      <div className="photo-grid">
        {photos.map((photo, index) => (
          <div className="photo-item" key={index}>
            <img
              src={photo}
              alt={`gallery item ${index + 1}`}
              className="photo-img"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoGrid;
