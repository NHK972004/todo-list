import { Button } from "antd";

const BookForm = () => {

    return (
        <div style={{ margin: "10px 0" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h2>Table Book</h2>
                <Button type="primary">Create Book</Button>
            </div>
        </div>
    )
}

export default BookForm;