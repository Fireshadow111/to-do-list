let input = document.getElementById('input');
        let addButton = document.getElementById('add');
        let itemsList = document.getElementById('items');

        let tasksArray = [];

        function toDo(item) {
            item = item.trim();
            item = item.charAt(0).toUpperCase() + item.slice(1);

            if (!item || item.length <= 3) {
                alert('Invalid input');
                return;
            }

            let task = {
                id: tasksArray.length === 0 ? 1 : tasksArray.length + 1,
                name: item,
                createdDate: new Date(),
                completed: false
            };

            input.value = '';
        }

        