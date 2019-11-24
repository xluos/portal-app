import { useEffect } from 'react'
export default function ScrollToTop({children, location}) {
  useEffect(() => {
    window &&
    window.scrollTo &&
    window.scrollTo(0, 0);
  }, [location])
  return children;
}