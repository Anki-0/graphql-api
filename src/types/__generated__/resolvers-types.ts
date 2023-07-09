import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { Context } from '../../graphql/context.js';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: Date | null; output: Date | null; }
  EmailAddress: { input: any; output: any; }
};

export type Book = {
  __typename?: 'Book';
  author?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type CreateAccountInput = {
  operation: Operation;
  token?: InputMaybe<Scalars['String']['input']>;
  username: Scalars['String']['input'];
};

export type CreateAccountResponse = {
  __typename?: 'CreateAccountResponse';
  accountCreated: Scalars['Boolean']['output'];
};

export type Error = {
  message: Scalars['String']['output'];
};

export type FindPostByInput = {
  _and?: InputMaybe<Array<FindPostByInput>>;
  _not?: InputMaybe<Array<FindPostByInput>>;
  _or?: InputMaybe<Array<FindPostByInput>>;
  content?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  publishedBy?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<PostStatus>;
  title?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type FindTagsByInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  tagname?: InputMaybe<Scalars['String']['input']>;
  userid?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type FindUserByInput = {
  _and?: InputMaybe<Array<FindUserByInput>>;
  _not?: InputMaybe<Array<FindUserByInput>>;
  _or?: InputMaybe<Array<FindUserByInput>>;
  account_status?: InputMaybe<UserAccountStatus>;
  bio?: InputMaybe<Scalars['String']['input']>;
  birthdate?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  email_verified?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone_number?: InputMaybe<Scalars['Int']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user_role?: InputMaybe<UserRoles>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createAccount: CreateAccountResponse;
  createPost: Post;
  deletePost: PostDeletionRespose;
  signin: SigninResponse;
  signup: SingupResponse;
  verifyToken: VerifyTokenResponse;
};


export type MutationCreateAccountArgs = {
  input: CreateAccountInput;
};


export type MutationCreatePostArgs = {
  input: PostCreationInput;
};


export type MutationDeletePostArgs = {
  input: PostDeletionArgs;
};


export type MutationSigninArgs = {
  input: SigninInput;
};


export type MutationSignupArgs = {
  input: SignupInput;
};


export type MutationVerifyTokenArgs = {
  input: VerifyTokenInput;
};

export enum Operation {
  Login = 'login',
  Register = 'register'
}

export type PaginationInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type PaginationResponse = {
  __typename?: 'PaginationResponse';
  hasNextPage?: Maybe<Scalars['Boolean']['output']>;
  hasPrevPage?: Maybe<Scalars['Boolean']['output']>;
};

export type PopularTagsResponse = {
  __typename?: 'PopularTagsResponse';
  count?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  tag_name?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type Post = {
  __typename?: 'Post';
  banner?: Maybe<Scalars['String']['output']>;
  content?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  modifiedBy?: Maybe<Scalars['String']['output']>;
  publishedBy: User;
  slug: Scalars['String']['output'];
  status: Scalars['String']['output'];
  subTitle?: Maybe<Scalars['String']['output']>;
  tags?: Maybe<Array<Maybe<Tag>>>;
  title: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type PostCreationInput = {
  banner?: InputMaybe<Scalars['String']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  status: Scalars['String']['input'];
  subTitle?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title: Scalars['String']['input'];
};

export type PostDeleteError = {
  __typename?: 'PostDeleteError';
  message: Scalars['String']['output'];
};

export type PostDeleteSuccess = {
  __typename?: 'PostDeleteSuccess';
  message: Scalars['String']['output'];
};

export type PostDeletionArgs = {
  postId: Scalars['ID']['input'];
};

export type PostDeletionRespose = {
  __typename?: 'PostDeletionRespose';
  error?: Maybe<PostDeleteError>;
  success?: Maybe<PostDeleteSuccess>;
};

export type PostFilterInput = {
  orderBy?: InputMaybe<OrderByFilter>;
  where?: InputMaybe<FindPostByInput>;
};

export enum PostStatus {
  Draft = 'draft',
  Private = 'private',
  Published = 'published'
}

export type PostsResponse = {
  __typename?: 'PostsResponse';
  data: Array<Maybe<Post>>;
  pagination?: Maybe<PaginationResponse>;
};

export type Query = {
  __typename?: 'Query';
  books?: Maybe<Array<Maybe<Book>>>;
  popularTags: Array<Maybe<PopularTagsResponse>>;
  posts?: Maybe<PostsResponse>;
  tags: Array<Maybe<Tag>>;
  users: Array<Maybe<User>>;
};


export type QueryPopularTagsArgs = {
  pagination?: InputMaybe<PaginationInput>;
};


export type QueryPostsArgs = {
  input?: InputMaybe<PostFilterInput>;
  pagination?: InputMaybe<PaginationInput>;
};


export type QueryTagsArgs = {
  input?: InputMaybe<TagsFilterInput>;
  pagination?: InputMaybe<PaginationInput>;
};


export type QueryUsersArgs = {
  input?: InputMaybe<UserFilterInput>;
};

export enum SearchFilterArgs {
  Exact = 'exact',
  Fulltext = 'fulltext',
  Hash = 'hash',
  Regexp = 'regexp',
  Term = 'term'
}

export type SigninError = Error & {
  __typename?: 'SigninError';
  message: Scalars['String']['output'];
};

export type SigninInput = {
  email: Scalars['EmailAddress']['input'];
};

export type SigninResponse = {
  __typename?: 'SigninResponse';
  error?: Maybe<SigninError>;
  success?: Maybe<SingninSuccess>;
};

export type SignupError = Error & {
  __typename?: 'SignupError';
  message: Scalars['String']['output'];
};

export type SignupInput = {
  email: Scalars['EmailAddress']['input'];
};

export type SignupSuccess = {
  __typename?: 'SignupSuccess';
  link?: Maybe<Scalars['String']['output']>;
  message: Scalars['String']['output'];
};

export type SingninSuccess = {
  __typename?: 'SingninSuccess';
  message: Scalars['String']['output'];
};

export type SingupResponse = {
  __typename?: 'SingupResponse';
  error?: Maybe<SignupError>;
  success?: Maybe<SignupSuccess>;
};

export type Tag = {
  __typename?: 'Tag';
  count?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  tag_name?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type TagsFilterInput = {
  where?: InputMaybe<FindTagsByInput>;
};

export type User = {
  __typename?: 'User';
  address?: Maybe<Scalars['String']['output']>;
  bio?: Maybe<Scalars['String']['output']>;
  birthdate?: Maybe<Scalars['DateTime']['output']>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  email_verified?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  phone_number?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user_role: Scalars['String']['output'];
  user_token?: Maybe<Scalars['String']['output']>;
  user_token_expat?: Maybe<Scalars['DateTime']['output']>;
  username: Scalars['String']['output'];
};

export enum UserAccountStatus {
  Active = 'ACTIVE',
  Pending = 'PENDING',
  Suspended = 'SUSPENDED'
}

export type UserFilterInput = {
  where?: InputMaybe<FindUserByInput>;
};

export enum UserRoles {
  Admin = 'admin',
  Client = 'client'
}

export type VerifyTokenInput = {
  operation: Operation;
  token: Scalars['String']['input'];
};

export type VerifyTokenResponse = {
  __typename?: 'VerifyTokenResponse';
  message: Scalars['String']['output'];
  verified: Scalars['Boolean']['output'];
};

export type OrderByFilter = {
  createdAt?: InputMaybe<SortFilter>;
  updatedAt?: InputMaybe<SortFilter>;
};

export enum SortFilter {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;


/** Mapping of interface types */
export type ResolversInterfaceTypes<RefType extends Record<string, unknown>> = ResolversObject<{
  Error: ( SigninError ) | ( SignupError );
}>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Book: ResolverTypeWrapper<Book>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CreateAccountInput: CreateAccountInput;
  CreateAccountResponse: ResolverTypeWrapper<CreateAccountResponse>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  EmailAddress: ResolverTypeWrapper<Scalars['EmailAddress']['output']>;
  Error: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['Error']>;
  FindPostByInput: FindPostByInput;
  FindTagsByInput: FindTagsByInput;
  FindUserByInput: FindUserByInput;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Operation: Operation;
  PaginationInput: PaginationInput;
  PaginationResponse: ResolverTypeWrapper<PaginationResponse>;
  PopularTagsResponse: ResolverTypeWrapper<PopularTagsResponse>;
  Post: ResolverTypeWrapper<Post>;
  PostCreationInput: PostCreationInput;
  PostDeleteError: ResolverTypeWrapper<PostDeleteError>;
  PostDeleteSuccess: ResolverTypeWrapper<PostDeleteSuccess>;
  PostDeletionArgs: PostDeletionArgs;
  PostDeletionRespose: ResolverTypeWrapper<PostDeletionRespose>;
  PostFilterInput: PostFilterInput;
  PostStatus: PostStatus;
  PostsResponse: ResolverTypeWrapper<PostsResponse>;
  Query: ResolverTypeWrapper<{}>;
  SearchFilterArgs: SearchFilterArgs;
  SigninError: ResolverTypeWrapper<SigninError>;
  SigninInput: SigninInput;
  SigninResponse: ResolverTypeWrapper<SigninResponse>;
  SignupError: ResolverTypeWrapper<SignupError>;
  SignupInput: SignupInput;
  SignupSuccess: ResolverTypeWrapper<SignupSuccess>;
  SingninSuccess: ResolverTypeWrapper<SingninSuccess>;
  SingupResponse: ResolverTypeWrapper<SingupResponse>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Tag: ResolverTypeWrapper<Tag>;
  TagsFilterInput: TagsFilterInput;
  User: ResolverTypeWrapper<User>;
  UserAccountStatus: UserAccountStatus;
  UserFilterInput: UserFilterInput;
  UserRoles: UserRoles;
  VerifyTokenInput: VerifyTokenInput;
  VerifyTokenResponse: ResolverTypeWrapper<VerifyTokenResponse>;
  orderByFilter: OrderByFilter;
  sortFilter: SortFilter;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Book: Book;
  Boolean: Scalars['Boolean']['output'];
  CreateAccountInput: CreateAccountInput;
  CreateAccountResponse: CreateAccountResponse;
  DateTime: Scalars['DateTime']['output'];
  EmailAddress: Scalars['EmailAddress']['output'];
  Error: ResolversInterfaceTypes<ResolversParentTypes>['Error'];
  FindPostByInput: FindPostByInput;
  FindTagsByInput: FindTagsByInput;
  FindUserByInput: FindUserByInput;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Mutation: {};
  PaginationInput: PaginationInput;
  PaginationResponse: PaginationResponse;
  PopularTagsResponse: PopularTagsResponse;
  Post: Post;
  PostCreationInput: PostCreationInput;
  PostDeleteError: PostDeleteError;
  PostDeleteSuccess: PostDeleteSuccess;
  PostDeletionArgs: PostDeletionArgs;
  PostDeletionRespose: PostDeletionRespose;
  PostFilterInput: PostFilterInput;
  PostsResponse: PostsResponse;
  Query: {};
  SigninError: SigninError;
  SigninInput: SigninInput;
  SigninResponse: SigninResponse;
  SignupError: SignupError;
  SignupInput: SignupInput;
  SignupSuccess: SignupSuccess;
  SingninSuccess: SingninSuccess;
  SingupResponse: SingupResponse;
  String: Scalars['String']['output'];
  Tag: Tag;
  TagsFilterInput: TagsFilterInput;
  User: User;
  UserFilterInput: UserFilterInput;
  VerifyTokenInput: VerifyTokenInput;
  VerifyTokenResponse: VerifyTokenResponse;
  orderByFilter: OrderByFilter;
}>;

export type DateDirectiveArgs = {
  defaultFormat?: Maybe<Scalars['String']['input']>;
};

export type DateDirectiveResolver<Result, Parent, ContextType = Context, Args = DateDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type SearchDirectiveArgs = {
  by?: Maybe<Array<SearchFilterArgs>>;
};

export type SearchDirectiveResolver<Result, Parent, ContextType = Context, Args = SearchDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type BookResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Book'] = ResolversParentTypes['Book']> = ResolversObject<{
  author?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CreateAccountResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['CreateAccountResponse'] = ResolversParentTypes['CreateAccountResponse']> = ResolversObject<{
  accountCreated?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export interface EmailAddressScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['EmailAddress'], any> {
  name: 'EmailAddress';
}

export type ErrorResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Error'] = ResolversParentTypes['Error']> = ResolversObject<{
  __resolveType: TypeResolveFn<'SigninError' | 'SignupError', ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  createAccount?: Resolver<ResolversTypes['CreateAccountResponse'], ParentType, ContextType, RequireFields<MutationCreateAccountArgs, 'input'>>;
  createPost?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<MutationCreatePostArgs, 'input'>>;
  deletePost?: Resolver<ResolversTypes['PostDeletionRespose'], ParentType, ContextType, RequireFields<MutationDeletePostArgs, 'input'>>;
  signin?: Resolver<ResolversTypes['SigninResponse'], ParentType, ContextType, RequireFields<MutationSigninArgs, 'input'>>;
  signup?: Resolver<ResolversTypes['SingupResponse'], ParentType, ContextType, RequireFields<MutationSignupArgs, 'input'>>;
  verifyToken?: Resolver<ResolversTypes['VerifyTokenResponse'], ParentType, ContextType, RequireFields<MutationVerifyTokenArgs, 'input'>>;
}>;

export type PaginationResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PaginationResponse'] = ResolversParentTypes['PaginationResponse']> = ResolversObject<{
  hasNextPage?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  hasPrevPage?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PopularTagsResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PopularTagsResponse'] = ResolversParentTypes['PopularTagsResponse']> = ResolversObject<{
  count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  tag_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PostResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']> = ResolversObject<{
  banner?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  modifiedBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  publishedBy?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  slug?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  subTitle?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tags?: Resolver<Maybe<Array<Maybe<ResolversTypes['Tag']>>>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PostDeleteErrorResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PostDeleteError'] = ResolversParentTypes['PostDeleteError']> = ResolversObject<{
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PostDeleteSuccessResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PostDeleteSuccess'] = ResolversParentTypes['PostDeleteSuccess']> = ResolversObject<{
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PostDeletionResposeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PostDeletionRespose'] = ResolversParentTypes['PostDeletionRespose']> = ResolversObject<{
  error?: Resolver<Maybe<ResolversTypes['PostDeleteError']>, ParentType, ContextType>;
  success?: Resolver<Maybe<ResolversTypes['PostDeleteSuccess']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PostsResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PostsResponse'] = ResolversParentTypes['PostsResponse']> = ResolversObject<{
  data?: Resolver<Array<Maybe<ResolversTypes['Post']>>, ParentType, ContextType>;
  pagination?: Resolver<Maybe<ResolversTypes['PaginationResponse']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  books?: Resolver<Maybe<Array<Maybe<ResolversTypes['Book']>>>, ParentType, ContextType>;
  popularTags?: Resolver<Array<Maybe<ResolversTypes['PopularTagsResponse']>>, ParentType, ContextType, Partial<QueryPopularTagsArgs>>;
  posts?: Resolver<Maybe<ResolversTypes['PostsResponse']>, ParentType, ContextType, Partial<QueryPostsArgs>>;
  tags?: Resolver<Array<Maybe<ResolversTypes['Tag']>>, ParentType, ContextType, Partial<QueryTagsArgs>>;
  users?: Resolver<Array<Maybe<ResolversTypes['User']>>, ParentType, ContextType, Partial<QueryUsersArgs>>;
}>;

export type SigninErrorResolvers<ContextType = Context, ParentType extends ResolversParentTypes['SigninError'] = ResolversParentTypes['SigninError']> = ResolversObject<{
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SigninResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['SigninResponse'] = ResolversParentTypes['SigninResponse']> = ResolversObject<{
  error?: Resolver<Maybe<ResolversTypes['SigninError']>, ParentType, ContextType>;
  success?: Resolver<Maybe<ResolversTypes['SingninSuccess']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SignupErrorResolvers<ContextType = Context, ParentType extends ResolversParentTypes['SignupError'] = ResolversParentTypes['SignupError']> = ResolversObject<{
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SignupSuccessResolvers<ContextType = Context, ParentType extends ResolversParentTypes['SignupSuccess'] = ResolversParentTypes['SignupSuccess']> = ResolversObject<{
  link?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SingninSuccessResolvers<ContextType = Context, ParentType extends ResolversParentTypes['SingninSuccess'] = ResolversParentTypes['SingninSuccess']> = ResolversObject<{
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SingupResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['SingupResponse'] = ResolversParentTypes['SingupResponse']> = ResolversObject<{
  error?: Resolver<Maybe<ResolversTypes['SignupError']>, ParentType, ContextType>;
  success?: Resolver<Maybe<ResolversTypes['SignupSuccess']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TagResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Tag'] = ResolversParentTypes['Tag']> = ResolversObject<{
  count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  tag_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = Context, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  bio?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  birthdate?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email_verified?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phone_number?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  user_role?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user_token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user_token_expat?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type VerifyTokenResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['VerifyTokenResponse'] = ResolversParentTypes['VerifyTokenResponse']> = ResolversObject<{
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  verified?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = Context> = ResolversObject<{
  Book?: BookResolvers<ContextType>;
  CreateAccountResponse?: CreateAccountResponseResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  EmailAddress?: GraphQLScalarType;
  Error?: ErrorResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  PaginationResponse?: PaginationResponseResolvers<ContextType>;
  PopularTagsResponse?: PopularTagsResponseResolvers<ContextType>;
  Post?: PostResolvers<ContextType>;
  PostDeleteError?: PostDeleteErrorResolvers<ContextType>;
  PostDeleteSuccess?: PostDeleteSuccessResolvers<ContextType>;
  PostDeletionRespose?: PostDeletionResposeResolvers<ContextType>;
  PostsResponse?: PostsResponseResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  SigninError?: SigninErrorResolvers<ContextType>;
  SigninResponse?: SigninResponseResolvers<ContextType>;
  SignupError?: SignupErrorResolvers<ContextType>;
  SignupSuccess?: SignupSuccessResolvers<ContextType>;
  SingninSuccess?: SingninSuccessResolvers<ContextType>;
  SingupResponse?: SingupResponseResolvers<ContextType>;
  Tag?: TagResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  VerifyTokenResponse?: VerifyTokenResponseResolvers<ContextType>;
}>;

export type DirectiveResolvers<ContextType = Context> = ResolversObject<{
  date?: DateDirectiveResolver<any, any, ContextType>;
  search?: SearchDirectiveResolver<any, any, ContextType>;
}>;
