#import <UIKit/UIKit.h>

@class RCTEventDispatcher;

@interface RCTVideoPlayer : UIView

- (instancetype)initWithEventDispatcher:(RCTEventDispatcher *)eventDispatcher NS_DESIGNATED_INITIALIZER;
- (void)initFromSource:(NSString *)source;
- (void)setResizeMode:(NSInteger)mode;

@end
