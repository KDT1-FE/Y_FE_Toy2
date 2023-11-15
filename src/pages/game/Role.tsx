import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import unidentified from '@/assets/images/unidentified.gif';
import roleSchema from '@/utils/role/schema';

import styles from '@/styles/pages/role.module.scss';

const Role = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoding] = useState(true);
  const tmpRole = 'citizen';
  const { id } = useParams();

  useEffect(() => {
    setTimeout(() => setIsLoding(false), 3000);
    setTimeout(() => navigate(`/chat/${id}`), 6000);
  }, []);

  return (
    <div className={styles.role}>
      <div className={styles.role__message}>
        {isLoading
          ? '유령마을의 모인 사람들의 정체를 파악하고 있습니다.'
          : '끝까지 살아남아주세요!'}
      </div>
      <div className={styles.role__container}>
        <div className={styles.role__container__result}>
          <img
            src={isLoading ? unidentified : roleSchema[tmpRole].url}
            alt="정체 이미지"
          />
        </div>
        <div className={styles.role__container__resultMsg}>
          {isLoading
            ? '당신의 정체는...?'
            : `당신은 ${roleSchema[tmpRole].value}입니다`}
        </div>
      </div>
    </div>
  );
};

export default Role;
