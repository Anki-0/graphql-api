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

/** DateTime Filter with undefined */
export type DateTime_With = {
  _between?: InputMaybe<Scalars['DateTime']['input']>;
  _eq?: InputMaybe<Scalars['DateTime']['input']>;
  _gt?: InputMaybe<Scalars['DateTime']['input']>;
  _gte?: InputMaybe<Scalars['DateTime']['input']>;
  _in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  _le?: InputMaybe<Scalars['DateTime']['input']>;
  _lt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type Error = {
  code: Scalars['String']['output'];
  message: Scalars['String']['output'];
};

export type FindPostByInput = {
  _and?: InputMaybe<Array<FindPostByInput>>;
  _not?: InputMaybe<Array<FindPostByInput>>;
  _or?: InputMaybe<Array<FindPostByInput>>;
  content?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<DateTime_With>;
  id?: InputMaybe<String_With_Exact_Fulltext_Hash>;
  image?: InputMaybe<Scalars['String']['input']>;
  publishedBy?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<String_With_Exact>;
  status?: InputMaybe<PostStatus_With>;
  title?: InputMaybe<String_With_Exact>;
  updatedAt?: InputMaybe<DateTime_With>;
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
  email?: InputMaybe<String_With_Exact>;
  email_verified?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<String_With_Exact>;
  image?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone_number?: InputMaybe<Scalars['Int']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user_role?: InputMaybe<UserRoles>;
  username?: InputMaybe<String_With_Exact>;
};

export type InvalidCredentialError = Error & {
  __typename?: 'InvalidCredentialError';
  code: Scalars['String']['output'];
  message: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createPost: Post;
  deletePost: PostDeletionRespose;
  signinWithCredentials: SigninWithCredentialsResponse;
  signupWithCredentials: SignupWithCredentialsResponse;
  verifyToken: VerifyTokenResponse;
};


export type MutationCreatePostArgs = {
  input: PostCreationInput;
};


export type MutationDeletePostArgs = {
  input: PostDeletionArgs;
};


export type MutationSigninWithCredentialsArgs = {
  input: SigninWithCredentialsInput;
};


export type MutationSignupWithCredentialsArgs = {
  input: SignupWithCredentialsInput;
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


export type PopularTagsResponseCreatedAtArgs = {
  format?: InputMaybe<Scalars['String']['input']>;
};


export type PopularTagsResponseUpdatedAtArgs = {
  format?: InputMaybe<Scalars['String']['input']>;
};

export type Post = {
  __typename?: 'Post';
  banner?: Maybe<Scalars['String']['output']>;
  content?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  modifiedBy?: Maybe<Scalars['String']['output']>;
  publishedBy: User;
  slug: Scalars['String']['output'];
  status: Scalars['String']['output'];
  subTitle?: Maybe<Scalars['String']['output']>;
  tags?: Maybe<Array<Maybe<Tag>>>;
  title: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['String']['output']>;
};


export type PostCreatedAtArgs = {
  format?: InputMaybe<Scalars['String']['input']>;
};


export type PostUpdatedAtArgs = {
  format?: InputMaybe<Scalars['String']['input']>;
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

/** PostStatus Filter with undefined */
export type PostStatus_With = {
  _eq?: InputMaybe<PostStatus>;
  _in?: InputMaybe<Array<InputMaybe<PostStatus>>>;
};

export type PostsResponse = {
  __typename?: 'PostsResponse';
  data: Array<Maybe<Post>>;
  pagination?: Maybe<PaginationResponse>;
};

export enum ProviderTypes {
  Credentials = 'credentials',
  Email = 'email',
  Oauth = 'oauth'
}

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
  code: Scalars['String']['output'];
  message: Scalars['String']['output'];
};

export type SigninWithCredentialsInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type SigninWithCredentialsResponse = {
  __typename?: 'SigninWithCredentialsResponse';
  error?: Maybe<SigninError>;
  success?: Maybe<SingninSuccess>;
};

export type SignupError = Error & {
  __typename?: 'SignupError';
  code: Scalars['String']['output'];
  message: Scalars['String']['output'];
};

export type SignupWithCredentialsInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type SignupWithCredentialsResponse = {
  __typename?: 'SignupWithCredentialsResponse';
  error?: Maybe<SignupError>;
  success?: Maybe<SingnupSuccess>;
};

export type SingninSuccess = {
  __typename?: 'SingninSuccess';
  message: Scalars['String']['output'];
  token: Scalars['String']['output'];
};

export type SingnupSuccess = {
  __typename?: 'SingnupSuccess';
  message: Scalars['String']['output'];
};

/** String Filter with exact */
export type String_With_Exact = {
  _between?: InputMaybe<Scalars['String']['input']>;
  _eq?: InputMaybe<Scalars['String']['input']>;
  _gt?: InputMaybe<Scalars['String']['input']>;
  _gte?: InputMaybe<Scalars['String']['input']>;
  _in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  _le?: InputMaybe<Scalars['String']['input']>;
  _lt?: InputMaybe<Scalars['String']['input']>;
};

/** String Filter with exact,fulltext,hash */
export type String_With_Exact_Fulltext_Hash = {
  _alloftext?: InputMaybe<Scalars['String']['input']>;
  _anyoftext?: InputMaybe<Scalars['String']['input']>;
  _between?: InputMaybe<Scalars['String']['input']>;
  _eq?: InputMaybe<Scalars['String']['input']>;
  _gt?: InputMaybe<Scalars['String']['input']>;
  _gte?: InputMaybe<Scalars['String']['input']>;
  _in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  _le?: InputMaybe<Scalars['String']['input']>;
  _lt?: InputMaybe<Scalars['String']['input']>;
};

export type Tag = {
  __typename?: 'Tag';
  count?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  tag_name?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};


export type TagCreatedAtArgs = {
  format?: InputMaybe<Scalars['String']['input']>;
};


export type TagUpdatedAtArgs = {
  format?: InputMaybe<Scalars['String']['input']>;
};

export type TagsFilterInput = {
  where?: InputMaybe<FindTagsByInput>;
};

export enum TokenType {
  Link = 'LINK',
  Otp = 'OTP'
}

export type User = {
  __typename?: 'User';
  address?: Maybe<Scalars['String']['output']>;
  bio?: Maybe<Scalars['String']['output']>;
  birthdate?: Maybe<Scalars['DateTime']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  email_verified?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  phone_number?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  user_role: Scalars['String']['output'];
  user_token?: Maybe<Scalars['String']['output']>;
  user_token_expat?: Maybe<Scalars['DateTime']['output']>;
  username: Scalars['String']['output'];
};


export type UserCreatedAtArgs = {
  format?: InputMaybe<Scalars['String']['input']>;
};


export type UserUpdatedAtArgs = {
  format?: InputMaybe<Scalars['String']['input']>;
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
  email: Scalars['String']['input'];
  operation: Operation;
  provider: ProviderTypes;
  token: Scalars['String']['input'];
  type: TokenType;
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
  Error: ( InvalidCredentialError ) | ( SigninError ) | ( SignupError );
}>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Book: ResolverTypeWrapper<Book>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  DateTime_with: DateTime_With;
  EmailAddress: ResolverTypeWrapper<Scalars['EmailAddress']['output']>;
  Error: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['Error']>;
  FindPostByInput: FindPostByInput;
  FindTagsByInput: FindTagsByInput;
  FindUserByInput: FindUserByInput;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  InvalidCredentialError: ResolverTypeWrapper<InvalidCredentialError>;
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
  PostStatus_with: PostStatus_With;
  PostsResponse: ResolverTypeWrapper<PostsResponse>;
  ProviderTypes: ProviderTypes;
  Query: ResolverTypeWrapper<{}>;
  SearchFilterArgs: SearchFilterArgs;
  SigninError: ResolverTypeWrapper<SigninError>;
  SigninWithCredentialsInput: SigninWithCredentialsInput;
  SigninWithCredentialsResponse: ResolverTypeWrapper<SigninWithCredentialsResponse>;
  SignupError: ResolverTypeWrapper<SignupError>;
  SignupWithCredentialsInput: SignupWithCredentialsInput;
  SignupWithCredentialsResponse: ResolverTypeWrapper<SignupWithCredentialsResponse>;
  SingninSuccess: ResolverTypeWrapper<SingninSuccess>;
  SingnupSuccess: ResolverTypeWrapper<SingnupSuccess>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  String_with_exact: String_With_Exact;
  String_with_exact_fulltext_hash: String_With_Exact_Fulltext_Hash;
  Tag: ResolverTypeWrapper<Tag>;
  TagsFilterInput: TagsFilterInput;
  TokenType: TokenType;
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
  DateTime: Scalars['DateTime']['output'];
  DateTime_with: DateTime_With;
  EmailAddress: Scalars['EmailAddress']['output'];
  Error: ResolversInterfaceTypes<ResolversParentTypes>['Error'];
  FindPostByInput: FindPostByInput;
  FindTagsByInput: FindTagsByInput;
  FindUserByInput: FindUserByInput;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  InvalidCredentialError: InvalidCredentialError;
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
  PostStatus_with: PostStatus_With;
  PostsResponse: PostsResponse;
  Query: {};
  SigninError: SigninError;
  SigninWithCredentialsInput: SigninWithCredentialsInput;
  SigninWithCredentialsResponse: SigninWithCredentialsResponse;
  SignupError: SignupError;
  SignupWithCredentialsInput: SignupWithCredentialsInput;
  SignupWithCredentialsResponse: SignupWithCredentialsResponse;
  SingninSuccess: SingninSuccess;
  SingnupSuccess: SingnupSuccess;
  String: Scalars['String']['output'];
  String_with_exact: String_With_Exact;
  String_with_exact_fulltext_hash: String_With_Exact_Fulltext_Hash;
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

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export interface EmailAddressScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['EmailAddress'], any> {
  name: 'EmailAddress';
}

export type ErrorResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Error'] = ResolversParentTypes['Error']> = ResolversObject<{
  __resolveType: TypeResolveFn<'InvalidCredentialError' | 'SigninError' | 'SignupError', ParentType, ContextType>;
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
}>;

export type InvalidCredentialErrorResolvers<ContextType = Context, ParentType extends ResolversParentTypes['InvalidCredentialError'] = ResolversParentTypes['InvalidCredentialError']> = ResolversObject<{
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  createPost?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<MutationCreatePostArgs, 'input'>>;
  deletePost?: Resolver<ResolversTypes['PostDeletionRespose'], ParentType, ContextType, RequireFields<MutationDeletePostArgs, 'input'>>;
  signinWithCredentials?: Resolver<ResolversTypes['SigninWithCredentialsResponse'], ParentType, ContextType, RequireFields<MutationSigninWithCredentialsArgs, 'input'>>;
  signupWithCredentials?: Resolver<ResolversTypes['SignupWithCredentialsResponse'], ParentType, ContextType, RequireFields<MutationSignupWithCredentialsArgs, 'input'>>;
  verifyToken?: Resolver<ResolversTypes['VerifyTokenResponse'], ParentType, ContextType, RequireFields<MutationVerifyTokenArgs, 'input'>>;
}>;

export type PaginationResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PaginationResponse'] = ResolversParentTypes['PaginationResponse']> = ResolversObject<{
  hasNextPage?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  hasPrevPage?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PopularTagsResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PopularTagsResponse'] = ResolversParentTypes['PopularTagsResponse']> = ResolversObject<{
  count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, Partial<PopularTagsResponseCreatedAtArgs>>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  tag_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, Partial<PopularTagsResponseUpdatedAtArgs>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PostResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']> = ResolversObject<{
  banner?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, Partial<PostCreatedAtArgs>>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  modifiedBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  publishedBy?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  slug?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  subTitle?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tags?: Resolver<Maybe<Array<Maybe<ResolversTypes['Tag']>>>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, Partial<PostUpdatedAtArgs>>;
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
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SigninWithCredentialsResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['SigninWithCredentialsResponse'] = ResolversParentTypes['SigninWithCredentialsResponse']> = ResolversObject<{
  error?: Resolver<Maybe<ResolversTypes['SigninError']>, ParentType, ContextType>;
  success?: Resolver<Maybe<ResolversTypes['SingninSuccess']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SignupErrorResolvers<ContextType = Context, ParentType extends ResolversParentTypes['SignupError'] = ResolversParentTypes['SignupError']> = ResolversObject<{
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SignupWithCredentialsResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['SignupWithCredentialsResponse'] = ResolversParentTypes['SignupWithCredentialsResponse']> = ResolversObject<{
  error?: Resolver<Maybe<ResolversTypes['SignupError']>, ParentType, ContextType>;
  success?: Resolver<Maybe<ResolversTypes['SingnupSuccess']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SingninSuccessResolvers<ContextType = Context, ParentType extends ResolversParentTypes['SingninSuccess'] = ResolversParentTypes['SingninSuccess']> = ResolversObject<{
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SingnupSuccessResolvers<ContextType = Context, ParentType extends ResolversParentTypes['SingnupSuccess'] = ResolversParentTypes['SingnupSuccess']> = ResolversObject<{
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TagResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Tag'] = ResolversParentTypes['Tag']> = ResolversObject<{
  count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, Partial<TagCreatedAtArgs>>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  tag_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, Partial<TagUpdatedAtArgs>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = Context, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  bio?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  birthdate?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, Partial<UserCreatedAtArgs>>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email_verified?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phone_number?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, Partial<UserUpdatedAtArgs>>;
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
  DateTime?: GraphQLScalarType;
  EmailAddress?: GraphQLScalarType;
  Error?: ErrorResolvers<ContextType>;
  InvalidCredentialError?: InvalidCredentialErrorResolvers<ContextType>;
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
  SigninWithCredentialsResponse?: SigninWithCredentialsResponseResolvers<ContextType>;
  SignupError?: SignupErrorResolvers<ContextType>;
  SignupWithCredentialsResponse?: SignupWithCredentialsResponseResolvers<ContextType>;
  SingninSuccess?: SingninSuccessResolvers<ContextType>;
  SingnupSuccess?: SingnupSuccessResolvers<ContextType>;
  Tag?: TagResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  VerifyTokenResponse?: VerifyTokenResponseResolvers<ContextType>;
}>;

export type DirectiveResolvers<ContextType = Context> = ResolversObject<{
  date?: DateDirectiveResolver<any, any, ContextType>;
  search?: SearchDirectiveResolver<any, any, ContextType>;
}>;
