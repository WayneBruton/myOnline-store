create database boredom_busters;
use boredom_busters;

create table users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name varchar(100) not null,
    last_name varchar(100) not null,
    email VARCHAR(100) NOT NULL UNIQUE,
    user_password VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP DEFAULT NOW(),
    resettoken varchar(20),
    resetexpiry TIMESTAMP DEFAULT NOW()
);

insert into users (email, user_password) values ('waynebruton@icloud.com', 'password');

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

create table clients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email varchar(100) not null unique,
    first_name varchar(100) not null,
    last_name varchar(100) not null,
    contact_number varchar(15) not null,
    delivery_address1 varchar(100) not null,
    delivery_address2 varchar(100),
    delivery_address3 varchar(100),
    suburb varchar(100),
    city varchar(100),
    province varchar(100),
    postal_code varchar(6) not null,
    created_at TIMESTAMP DEFAULT NOW()
);

create table invoices (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_number varchar(100) not null,
    client_id int not null,
    total_Value decimal(11,2) not null,
    invoice_date TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (order_number) REFERENCES orders(order_number)
);

create table cart (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id int not null,
    item_price decimal(6,2) not null,
    item_weight decimal(5,2) not null default 0.00,
    item_quantity int not null default 1,
    item_name varchar(100) not null,
    sales_weight decimal(5,2) not null,
    sales_value decimal(35,2) not null,
    order_number varchar(100) not null,
    product_image varchar(100),
    salesPriceString varchar(20) not null,
    FOREIGN KEY (product_id) REFERENCES products(id)
);



create table orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id int not null,
    client_id int not null,
    item_price decimal(6,2) not null,
    item_weight decimal(5,2) not null default 0.00,
    item_quantity int not null default 1,
    item_name varchar(100) not null,
    sales_weight decimal(5,2) not null,
    sales_value decimal(35,2) not null,
    order_number varchar(100) not null,
    product_image varchar(100),
    salesPriceString varchar(20) not null,
    invoice_number int,
    invoiced boolean not null default false,
    paid boolean not null default false,
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (client_id) REFERENCES clients(id),
    FOREIGN KEY (invoice_number) REFERENCES invoices(id)
);











 
