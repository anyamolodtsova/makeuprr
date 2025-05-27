# register.py
import sys
import json

def register_user(email, password):
    try:
        # 1. Пытаемся прочитать существующие данные
        with open('users.json', 'r') as f:
            users = json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        users = []
    
    # 2. Проверяем, есть ли уже такой email
    if any(u['email'] == email for u in users):
        print("ERROR: Email already exists")
        return False
    
    # 3. Добавляем нового пользователя
    users.append({
        'email': email,
        'password': password  # В реальном проекте нужно хэшировать!
    })
    
    # 4. Сохраняем в файл
    with open('users.json', 'w') as f:
        json.dump(users, f, indent=2)
    
    print("SUCCESS")
    return True

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("ERROR: Need email and password")
        exit(1)
    
    email = sys.argv[1]
    password = sys.argv[2]
    register_user(email, password)