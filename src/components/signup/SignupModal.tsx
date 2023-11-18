import { useEffect, useState } from 'react';
import PocketBase from 'pocketbase';
import { getCharacters } from '@store/ghostSlice';
import { useAppSelector, useAppDispatch } from '@/hooks/redux';
import { setCharacter } from '@/store/selectedGhostSlice';
import styles from '@styles/components/signupModal.module.scss';

const pb = new PocketBase('https://full-oil.pockethost.io');

const SignupModal: React.FC<SignupModalProps> = ({ handleModal }) => {
  const dispatch = useAppDispatch();
  const ghosts: Ghost[] = useAppSelector((state) => state.ghosts);

  const [currentPage, setCurrentPage] = useState(1);
  const limit: number = 4;
  const offset = (currentPage - 1) * limit;

  const fetchURL = async (id: string, field: string) => {
    try {
      const fileUrl = await fetchFileUrl(id, field);

      if (fileUrl) {
        const ghost = { id: crypto.randomUUID(), fileUrl };
        dispatch(getCharacters(ghost));
      } else {
        console.log('Error fetching file URL.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchFileUrl = async (recordId: string, filename: string) => {
    try {
      const record = await pb.collection('ghosts').getOne(recordId);

      if (record) {
        const url = pb.files.getUrl(record, filename);
        return url;
      } else {
        console.error('Record not found.');
        return null;
      }
    } catch (error) {
      // console.error('Error fetching file URL:', error);
      return null;
    }
  };

  const getGhosts = async () => {
    try {
      const response = await fetch(
        `https://full-oil.pockethost.io/api/collections/ghosts/records`,
        { cache: 'no-store' },
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const records = await getGhosts();
        await getURLs(records.items);
      } catch (error) {
        console.error('Error fetching ghost records:', error);
      }
    };

    const getURLs = async (records: GhostRecord[]) => {
      try {
        await Promise.all(
          records.map(
            async (record) => await fetchURL(record.id, record.field),
          ),
        );
      } catch (error) {
        console.log('getURLs failed', error);
      }
    };

    fetchData();
  }, []);

  const chooseGhost = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setCharacter(event.target.value));
  };

  const goNext = () => {
    if (currentPage === 4) {
      setCurrentPage(1);
    } else {
      setCurrentPage(currentPage + 1);
    }
  };

  const goPrevious = () => {
    if (currentPage === 1) {
      setCurrentPage(1);
    } else {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className={styles.singupModal}>
      <div className={styles.singupModal__container}>
        <div className={styles.singupModal__left_btn}>
          <span
            onClick={() => goPrevious()}
            className="material-symbols-outlined">
            ◀
          </span>
        </div>
        <div className={styles.singupModal__carousel_container}>
          <div className={styles.singupModal__radio_container}>
            {ghosts.slice(offset, offset + limit).map((ghost) => (
              <div key={ghost.id} className={styles.singupModal__radio_item}>
                <input
                  required
                  type="radio"
                  id={ghost.id}
                  name="contact"
                  value={ghost.fileUrl}
                  onChange={(event) => chooseGhost(event)}
                />
                <label htmlFor={ghost.id}>
                  <div
                    className={styles.character}
                    style={{ backgroundImage: `url(${ghost.fileUrl})` }}></div>
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.singupModal__right_btn}>
          <span onClick={() => goNext()} className="material-symbols-outlined">
          ▶
          </span>
        </div>
      </div>
      <button
        onClick={() => handleModal()}
        className={styles.modal__submit_btn}>
        캐릭터 선택
      </button>
    </div>
  );
};

export default SignupModal;

type SignupModalProps = {
  handleModal: () => void;
};

interface GhostRecord { 
  id: string, 
  filename: string,
  field: string,
}

interface Ghost {
  id: string;
  fileUrl: string;
}