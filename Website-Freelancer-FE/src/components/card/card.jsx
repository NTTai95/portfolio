
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { border, borderGradient } from '@cloudinary/url-gen/qualifiers/background';
import { Avatar, Card, Image, Button, Flex } from 'antd';
import scss from "./card.module.scss"
const CardAbout = ({ image, context, context1 }) => {
    return (
            <Card className={scss.card}>
                <div className={scss.avatar}>
                    <img src={image} />
                </div>
                <div className={scss.context}>
                    <p className={scss.title}>{context}</p>
                    <p style={{ textAlign: 'center' }}>{context1}</p>
                </div>
            </Card>
        );
};

export default CardAbout;