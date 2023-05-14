export default function PixabaiApi(query, page) {
  return fetch(`https://pixabay.com/api/?q=${query}&page=${page}&key=34776751-542703831e8d0e3da0fedf62a&image_type=photo&orientation=horizontal&per_page=12`)
          .then(res => res.json())
  
}
