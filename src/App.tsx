import './App.css';
import {makeRandomUser} from './data/data';
import {UserCard} from './components/UserCard';
import {Layout} from './components/Layout';
import {useState, useEffect} from 'react';
import {UserProfile} from './types/user';
import {AnimatePresence} from 'framer-motion';

function App() {
  // local data
  // const [users, setUsers] = useState<UserProfile[]>(() => {
  //   const saved = localStorage.getItem('sns-users');
  //   return saved
  //     ? JSON.parse(saved)
  //     : Array(5)
  //         .fill(0)
  //         .map((_, index) => makeRandomUser());
  // });
  // remote data
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return (
      saved === 'dark' ||
      (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)
    );
  });

  const address = 'https://my-sns-backend-ocxj.onrender.com/api/users';
  // const address = 'http://localhost:8080/api/users/';

  useEffect(() => {
    const fechUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          // 'https://jsonplaceholder.typicode.com/users',
          // 'http://localhost:8080/api/users',
          address,
        );
        const data = await response.json();
        // const formattedUsers: UserProfile[] = data.map((user: any) => ({
        //   id: String(user.id),
        //   name: user.name,
        //   email: user.email,
        //   avatar: `https://i.pravatar.cc/150?u=${user.id}`, // 랜덤 아바타 서비스 이용
        //   postImage: `https://picsum.photos/seed/${user.id}/600/400`, // 랜덤 사진 서비스 이용
        //   bio: `${user.company.catchPhrase} - working at ${user.company.name}`,
        //   isGoldMember: user.id % 3 === 0, // 3의 배수 아이디만 골드 멤버로 설정
        // }));
        setUsers(data);
      } catch (error) {
        console.error('데이터를 가져오는데 실패했어요!', error);
      } finally {
        setLoading(false);
      }
    };
    fechUsers();
  }, []);

  // local
  // useEffect(() => {
  //   localStorage.setItem('sns-users', JSON.stringify(users));
  // }, [users]);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()),
  );

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const deleteUser = async (id: number) => {
    try {
      const response = await fetch(`${address}/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setUsers((users) => users.filter((u) => u.id !== id));
      }
    } catch (error) {
      console.error('데이터를 삭제하는데 실패했어요!', error);
    } finally {
    }
  };

  const addUser = async (newUser: UserProfile) => {
    const {id, ...noidUser} = newUser;
    try {
      const response = await fetch(`${address}/users`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(noidUser),
      });
      if (response.ok) {
        const savedUser = await response.json();
        setUsers((users) => [...users, savedUser]);
      }
    } catch (error) {
      console.error('데이터를 추가하는데 실패했어요!', error);
    } finally {
    }
  };

  return (
    <Layout
      id="sns-root"
      onAdd={function (newUser: UserProfile) {
        addUser(newUser);
      }}
      onSearch={(search: string) => {
        setSearch(search);
      }}
      onInit={() => {
        const initialUsers = Array(5)
          .fill(0)
          .map(() => makeRandomUser());
        setUsers(initialUsers);
      }}
      toggleDark={() => {
        setIsDark((isDark) => !isDark);
      }}
      isDark={isDark}
    >
      <div className="flex gap-4 mb-6">
        <div className="flex-1 p-4 text-center bg-white border-gray-100 rounded-lg shadow-sm">
          <span className="stat-card">총 게시글</span>
          <p className="text-2xl font-bold text-indigo-600">
            {filteredUsers.length}개
          </p>
        </div>
        <div className="flex-1 p-4 text-center bg-white border border-gray-100 rounded-lg shadow-sm">
          <span className="text-sm text-gray-500">골드 멤버</span>
          <p className="text-2xl font-bold text-yellow-500">
            {filteredUsers.filter((u) => u.isGoldMember).length}명
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-12 h-12 border-4 border-indigo-500 rounded-full border-t-transparent animate-spin"></div>
          <p className="mt-4 text-gray-500 dark:text-gray-400">
            서버에서 유저 정보를 가져오는 중...
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 mx-auto md:grid-cols-2 lg:grid-cols-3 max-w-7xl">
          <AnimatePresence mode="popLayout">
            {filteredUsers.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                onDelete={(id: number) => {
                  deleteUser(id);
                }}
                onSwap={(id: number) => {
                  setUsers((users) =>
                    users.map((u) =>
                      u.id === id ? {...u, isGoldMember: !u.isGoldMember} : u,
                    ),
                  );
                }}
              />
            ))}
          </AnimatePresence>
        </div>
      )}
    </Layout>
  );
}

export default App;
