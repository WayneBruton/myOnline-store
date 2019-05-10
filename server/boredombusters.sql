create database boredom_busters;
use boredom_busters;

create table users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name varchar(100) not null,
    last_name varchar(100) not null,
    email VARCHAR(100) NOT NULL UNIQUE,
    contact_number varchar(100),
    delivery_address text,
    postal_code INT,
    suburb VARCHAR(100),
    city VARCHAR(100),
    province varchar(100),
    user_password VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP DEFAULT NOW(),
    resettoken varchar(20),
    resetexpiry TIMESTAMP DEFAULT NOW()
);

create table products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_name varchar(100) not null unique,
    product_description text not null,
    product_weight decimal(5,2) not null default 0.0,
    product_length decimal(5,2) not null default 0.0,
    product_height decimal(5,2) not null default 0.0,
    product_breadth decimal(5,2) not null default 0.0,
    vatable boolean not null default false,
    price decimal(7,2) not null default 0.0,
    vat decimal(7,2) not null default 0.0,
    items_in_stock int not null default 999,
    product_image varchar(100),
    available   boolean default true,
    created_at TIMESTAMP DEFAULT NOW()
);


create table invoices (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id int not null,
    total_Value decimal(11,2) not null,
    invoice_date TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

create table cart (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id int not null,
    user_id INT not null,
    price decimal(35,2) not null,
    quantity int not null,
    total decimal(35,2) not null,
    invoice_number int,
    vat decimal(35,2) not null default 0.0,
    netAmount decimal(35,2) not null,
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (invoice_number) REFERENCES invoices(id)
);



insert into products (product_name,product_description, price, product_image ) values 
(
    'Skipping Rope',
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa accusamus iure neque dicta
    consequatur. Adipisci quae doloribus veniam laboriosam, illo minus ratione magnam nemo, quasi
    quos accusantium, quaerat veritatis dolor.
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa accusamus iure neque dicta
    consequatur. Adipisci quae doloribus veniam laboriosam, illo minus ratione magnam nemo, quasi
    quos accusantium, quaerat veritatis dolor.
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa accusamus iure neque dicta
    consequatur. Adipisci quae doloribus veniam laboriosam, illo minus ratione magnam nemo, quasi
    quos accusantium, quaerat veritatis dolor.',
    199.90,
    "/images/image25.jpeg"
),
(
    'Tic Tac Toe',
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa accusamus iure neque dicta
    consequatur. Adipisci quae doloribus veniam laboriosam, illo minus ratione magnam nemo, quasi
    quos accusantium, quaerat veritatis dolor.
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa accusamus iure neque dicta
    consequatur. Adipisci quae doloribus veniam laboriosam, illo minus ratione magnam nemo, quasi
    quos accusantium, quaerat veritatis dolor.
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa accusamus iure neque dicta
    consequatur. Adipisci quae doloribus veniam laboriosam, illo minus ratione magnam nemo, quasi
    quos accusantium, quaerat veritatis dolor.',
    249.90,
    "/images/image26.jpeg"
),
(
    'Snakes & Ladders',
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa accusamus iure neque dicta
    consequatur. Adipisci quae doloribus veniam laboriosam, illo minus ratione magnam nemo, quasi
    quos accusantium, quaerat veritatis dolor.
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa accusamus iure neque dicta
    consequatur. Adipisci quae doloribus veniam laboriosam, illo minus ratione magnam nemo, quasi
    quos accusantium, quaerat veritatis dolor.
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa accusamus iure neque dicta
    consequatur. Adipisci quae doloribus veniam laboriosam, illo minus ratione magnam nemo, quasi
    quos accusantium, quaerat veritatis dolor.',
    89.90,
    "/images/image27.jpeg"
);







insert into products (product_name,product_description, price, product_image ) values 
(
    'Product 4',
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa accusamus iure neque dicta
    consequatur. Adipisci quae doloribus veniam laboriosam, illo minus ratione magnam nemo, quasi
    quos accusantium, quaerat veritatis dolor.
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa accusamus iure neque dicta
    consequatur. Adipisci quae doloribus veniam laboriosam, illo minus ratione magnam nemo, quasi
    quos accusantium, quaerat veritatis dolor.
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa accusamus iure neque dicta
    consequatur. Adipisci quae doloribus veniam laboriosam, illo minus ratione magnam nemo, quasi
    quos accusantium, quaerat veritatis dolor.',
    211.99,
    "/images/image10.jpeg"
),
(
    'Product 5',
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa accusamus iure neque dicta
    consequatur. Adipisci quae doloribus veniam laboriosam, illo minus ratione magnam nemo, quasi
    quos accusantium, quaerat veritatis dolor.
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa accusamus iure neque dicta
    consequatur. Adipisci quae doloribus veniam laboriosam, illo minus ratione magnam nemo, quasi
    quos accusantium, quaerat veritatis dolor.
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa accusamus iure neque dicta
    consequatur. Adipisci quae doloribus veniam laboriosam, illo minus ratione magnam nemo, quasi
    quos accusantium, quaerat veritatis dolor.',
    221.90,
    "/images/image11.png"
),
(
    'Product 6',
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa accusamus iure neque dicta
    consequatur. Adipisci quae doloribus veniam laboriosam, illo minus ratione magnam nemo, quasi
    quos accusantium, quaerat veritatis dolor.
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa accusamus iure neque dicta
    consequatur. Adipisci quae doloribus veniam laboriosam, illo minus ratione magnam nemo, quasi
    quos accusantium, quaerat veritatis dolor.
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa accusamus iure neque dicta
    consequatur. Adipisci quae doloribus veniam laboriosam, illo minus ratione magnam nemo, quasi
    quos accusantium, quaerat veritatis dolor.',
    77.65,
    "/images/image16.png"
),
(
    'Product 7',
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa accusamus iure neque dicta
    consequatur. Adipisci quae doloribus veniam laboriosam, illo minus ratione magnam nemo, quasi
    quos accusantium, quaerat veritatis dolor.
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa accusamus iure neque dicta
    consequatur. Adipisci quae doloribus veniam laboriosam, illo minus ratione magnam nemo, quasi
    quos accusantium, quaerat veritatis dolor.
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa accusamus iure neque dicta
    consequatur. Adipisci quae doloribus veniam laboriosam, illo minus ratione magnam nemo, quasi
    quos accusantium, quaerat veritatis dolor.',
    113.18,
    "/images/image21.jpeg"
),
(
    'Product 8',
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa accusamus iure neque dicta
    consequatur. Adipisci quae doloribus veniam laboriosam, illo minus ratione magnam nemo, quasi
    quos accusantium, quaerat veritatis dolor.
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa accusamus iure neque dicta
    consequatur. Adipisci quae doloribus veniam laboriosam, illo minus ratione magnam nemo, quasi
    quos accusantium, quaerat veritatis dolor.
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa accusamus iure neque dicta
    consequatur. Adipisci quae doloribus veniam laboriosam, illo minus ratione magnam nemo, quasi
    quos accusantium, quaerat veritatis dolor.',
    189.01,
    "/images/image22.jpeg"
),
(
    'Product 9',
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa accusamus iure neque dicta
    consequatur. Adipisci quae doloribus veniam laboriosam, illo minus ratione magnam nemo, quasi
    quos accusantium, quaerat veritatis dolor.
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa accusamus iure neque dicta
    consequatur. Adipisci quae doloribus veniam laboriosam, illo minus ratione magnam nemo, quasi
    quos accusantium, quaerat veritatis dolor.
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa accusamus iure neque dicta
    consequatur. Adipisci quae doloribus veniam laboriosam, illo minus ratione magnam nemo, quasi
    quos accusantium, quaerat veritatis dolor.',
    289.90,
    "/images/image28.png"
),
(
    'Product 10',
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa accusamus iure neque dicta
    consequatur. Adipisci quae doloribus veniam laboriosam, illo minus ratione magnam nemo, quasi
    quos accusantium, quaerat veritatis dolor.
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa accusamus iure neque dicta
    consequatur. Adipisci quae doloribus veniam laboriosam, illo minus ratione magnam nemo, quasi
    quos accusantium, quaerat veritatis dolor.
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa accusamus iure neque dicta
    consequatur. Adipisci quae doloribus veniam laboriosam, illo minus ratione magnam nemo, quasi
    quos accusantium, quaerat veritatis dolor.',
    69.15,
    "/images/image35.jpeg"
),
(
    'Product 11',
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa accusamus iure neque dicta
    consequatur. Adipisci quae doloribus veniam laboriosam, illo minus ratione magnam nemo, quasi
    quos accusantium, quaerat veritatis dolor.
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa accusamus iure neque dicta
    consequatur. Adipisci quae doloribus veniam laboriosam, illo minus ratione magnam nemo, quasi
    quos accusantium, quaerat veritatis dolor.
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa accusamus iure neque dicta
    consequatur. Adipisci quae doloribus veniam laboriosam, illo minus ratione magnam nemo, quasi
    quos accusantium, quaerat veritatis dolor.',
    121.70,
    "/images/image36.jpeg"
),
(
    'Product 12',
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa accusamus iure neque dicta
    consequatur. Adipisci quae doloribus veniam laboriosam, illo minus ratione magnam nemo, quasi
    quos accusantium, quaerat veritatis dolor.
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa accusamus iure neque dicta
    consequatur. Adipisci quae doloribus veniam laboriosam, illo minus ratione magnam nemo, quasi
    quos accusantium, quaerat veritatis dolor.
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa accusamus iure neque dicta
    consequatur. Adipisci quae doloribus veniam laboriosam, illo minus ratione magnam nemo, quasi
    quos accusantium, quaerat veritatis dolor.',
    99.99,
    "/images/image37.jpeg"
),
(
    'Product 13',
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa accusamus iure neque dicta
    consequatur. Adipisci quae doloribus veniam laboriosam, illo minus ratione magnam nemo, quasi
    quos accusantium, quaerat veritatis dolor.
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa accusamus iure neque dicta
    consequatur. Adipisci quae doloribus veniam laboriosam, illo minus ratione magnam nemo, quasi
    quos accusantium, quaerat veritatis dolor.
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa accusamus iure neque dicta
    consequatur. Adipisci quae doloribus veniam laboriosam, illo minus ratione magnam nemo, quasi
    quos accusantium, quaerat veritatis dolor.',
    88.76,
    "/images/image38.png"
);





 
