import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderDto, UpdateOrderDto } from 'src/dto/order.dto';
import { Book } from 'src/entities/book.entity';
import { OrderItem } from 'src/entities/order-item.entity';
import { Order } from 'src/entities/order.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
  ) {}

  async findUser(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findBook(id: number): Promise<Book> {
    const book = await this.bookRepository.findOne({ where: { id } });
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    return book;
  }

  async createOrder(orderDto: CreateOrderDto): Promise<Order> {
    const { orderItems, ...orderData } = orderDto;
    const user = await this.findUser(orderData.userId);
    const order = await this.orderRepository.save({ ...orderData, user });

    const orderItemsToCreate = await Promise.all(
      orderItems.map(async (orderItem) => {
        const book = await this.findBook(orderItem.bookId);
        return {
          ...orderItem,
          order,
          book,
        };
      }),
    );

    const createdOrderItems = await this.orderItemRepository.save(
      orderItemsToCreate,
    );

    return { ...order, orderItems: createdOrderItems };
  }

  async findAll(): Promise<Order[]> {
    const orders = await this.orderRepository.find({
      relations: ['orderItems'],
    });
    return orders;
  }

  async findOne(id: number): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['orderItems'],
    });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }

  async update(id: number, orderDto: UpdateOrderDto): Promise<Order> {
    const user = await this.findUser(orderDto.userId);
    const order = await this.orderRepository.update(id, {
      ...orderDto,
      user,
    });
    if (order.affected === 0) {
      throw new NotFoundException('Order not found');
    }
    return await this.findOne(id);
  }

  async remove(id: number): Promise<any> {
    const order = await this.orderRepository.delete(id);
    if (order.affected === 0) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }
}
