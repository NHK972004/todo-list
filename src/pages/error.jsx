import { Button, Result } from "antd";
import { Link, useRouteError } from "react-router-dom";

const ErrorPage = () => {
    const error = useRouteError();
    console.log(error)

    return (
        <div id="error-page">
            <Result
                status={error.status}
                title={`${error.status} Oops!`}
                subTitle={error.statusText || error.message}
                extra={<Button type="primary"><Link to="/">Back to HomePage</Link></Button>}
            />
        </div>
    );
}

export default ErrorPage;