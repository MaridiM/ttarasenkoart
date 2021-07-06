import sass from './styles.module.sass'

const GalleryList = () => {
    return (
        <div className={sass.table}>
            <header className={sass.thead}>
                <ul>
                    <li>ID</li>
                    <li>Picture</li>
                    <li>Title</li>
                    <li>Category</li>
                    <li>Availability</li>
                    <li>Type</li>
                    <li>Size</li>
                    <li>Stock</li>
                    <li>Action</li>
                </ul>
            </header>
            <div className={sass.tbody}>
                <ul>
                    <li>9999</li>
                    <li>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/IMG_logo_%282017%29.svg" alt="Hello" />
                    </li>
                    <li>Some title block i dont know</li>
                    <li>Category</li>
                    <li>Availability</li>
                    <li>Type</li>
                    <li>127*32</li>
                    <li>Stock</li>
                    <li>
                        <button><i className="fas fa-trash"></i></button>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default GalleryList
